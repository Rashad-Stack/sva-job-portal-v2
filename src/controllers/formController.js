import prisma from "../DB/db.config.js";

export const fetchForms = async (req, res) => {
  try {
    const forms = await prisma.form.findMany({
      include: {
        fields: {
          include: true,
        },
      },
    });
    res.status(200).json({ success: true, data: forms });
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const showForm = async (req, res) => {
  const formId = req.params.id;

  try {
    const form = await prisma.form.findUnique({
      where: { id: formId },
      include: {
        fields: {
          include: true,
        },
      },
    });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ success: true, data: form });
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createForm = async (req, res) => {
  console.log("client:", req.body);
  try {
    const { formTitle, fields, newField } = req.body;

    if (!formTitle || !fields || !Array.isArray(fields)) {
      return res.status(400).json({
        error: "formTitle and fields are required, and fields must be an array",
      });
    }

    // Clean and validate fields
    const cleanedFields = fields.map((field) => ({
      title: field.title || "",
      type: field.type || "text",
      required: field.required || false,
      column: field.column || 12,
      options: Array.isArray(field.options) ? field.options : [],
      value: field.value || null,
    }));

    let finalFields = cleanedFields;
    if (newField && newField.title && newField.type) {
      finalFields = [
        ...cleanedFields,
        {
          title: newField.title,
          type: newField.type,
          required: newField.required || false,
          column: newField.column || 12,
          options: Array.isArray(newField.options) ? newField.options : [],
          value: null,
        },
      ];
    }

    // Create form and fields in a transaction
    const newForm = await prisma.$transaction(async (tx) => {
      // Create the form
      const form = await tx.form.create({
        data: {
          formTitle,
        },
      });

      // Create fields
      await tx.field.createMany({
        data: finalFields.map((field) => ({
          formId: form.id,
          title: field.title,
          type: field.type,
          required: field.required,
          column: field.column,
          options: field.options,
          value: field.value,
        })),
      });

      return form;
    });

    return res.status(201).json({
      message: "Form created successfully",
      data: newForm,
    });
  } catch (error) {
    console.error("Error creating form:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteForm = async (req, res) => {
  const formId = req.params.id;

  console.log(formId);

  try {
    await prisma.form.deleteMany({
      where: { id: formId },
    });

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateForm = async (req, res) => {
  const formId = req.params.id;
  const { formTitle, fields } = req.body;

  try {
    const existingForm = await prisma.form.findUnique({
      where: { id: formId },
    });

    if (!existingForm) {
      return res.status(404).json({ message: "Form not found" });
    } else {
      // Delete existing fields
      await prisma.field.deleteMany({
        where: { formId: formId },
      });

      // Create new fields
      const newFields = await Promise.all(
        fields.map((field) => {
          // Normalize type to match FieldType enum
          const typeMap = {
            text: "text",
            number: "number",
            select: "select",
            radio: "radio",
            checkbox: "checkbox",
          };
          const fieldType = typeMap[field.type.toLowerCase()] || "text"; // Fallback to text

          return prisma.field.create({
            data: {
              title: field.title,
              required: field.required,
              column: field.column,
              type: fieldType,
              formId: formId,
              options: field.options,
            },
          });
        })
      );

      // Update form title
      const updatedForm = await prisma.form.update({
        where: { id: formId },
        data: {
          formTitle,
        },
        include: {
          fields: true,
        }, // Include fields and options in response
      });

      res.status(200).json({ success: true, data: updatedForm });
    }
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
