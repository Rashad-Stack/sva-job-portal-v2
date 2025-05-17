import prisma from "../DB/db.config.js";

export const fetchForms = async (req, res) => {
  try {
    const forms = await prisma.form.findMany({
      include: {
        fields: true,
        include: {
          options: true,
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
    const { formTitle, fields } = req.body;

    // Validate input
    if (!formTitle || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({
        message: "formTitle and a non-empty fields array are required",
      });
    }

    const newForm = await prisma.form.create({
      data: {
        formTitle,
        fields: {
          create: fields.map((field) => {
            // Normalize type to match FieldType enum
            const typeMap = {
              text: "text",
              number: "number",
              select: "select",
              radio: "radio",
              checkbox: "checkbox",
            };
            const fieldType = typeMap[field.type.toLowerCase()] || "text"; // Fallback to text

            return {
              title: field.title,
              required: field.required,
              column: field.column,
              type: fieldType,
              options: {
                create: field.options
                  ? field.options
                      .filter((opt) => {
                        // Check for either radio or select key, and ensure label or value exists
                        const optionData = opt.radio || opt.select;
                        return (
                          optionData && (optionData.label || optionData.value)
                        );
                      })
                      .map((opt) => {
                        const optionData = opt.radio || opt.select;
                        return {
                          label: optionData.label,
                          value: optionData.value,
                        };
                      })
                  : [],
              },
            };
          }),
        },
      },
      include: {
        fields: {
          include: { options: true },
        },
      }, // Include fields and options in response
    });

    res.status(201).json({ success: true, data: newForm });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteForm = async (req, res) => {
  const formId = req.params.id;

  try {
    await prisma.form.delete({ where: { id: formId } });

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
      const updatedForm = await prisma.form.update({
        where: { id: formId },
        data: {
          formTitle,
          fields: {
            deleteMany: {},
            create: fields.map((field) => {
              // Normalize type to match FieldType enum
              const typeMap = {
                text: "text",
                number: "number",
                select: "select",
                radio: "radio",
                checkbox: "checkbox",
              };
              const fieldType = typeMap[field.type.toLowerCase()] || "text"; // Fallback to text

              return {
                title: field.title,
                required: field.required,
                column: field.column,
                type: fieldType,
                options: {
                  create: field.options
                    ? field.options
                        .filter((opt) => {
                          // Check for either radio or select key, and ensure label or value exists
                          const optionData = opt.radio || opt.select;
                          return (
                            optionData && (optionData.label || optionData.value)
                          );
                        })
                        .map((opt) => {
                          const optionData = opt.radio || opt.select;
                          return {
                            label: optionData.label,
                            value: optionData.value,
                          };
                        })
                    : [],
                },
              };
            }),
          },
        },
        include: {
          fields: {
            include: { options: true },
          },
        }, // Include fields and options in response
      });

      res.status(200).json({ success: true, data: updatedForm });
    }
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
