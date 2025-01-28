export const manifestSchama = {
    type: "object",
    properties: {
      resource: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1 },
          description: { type: "string" },
          version: { type: "string", minLength: 1 },
          type: { type: "string" },
          scripts: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["name", "version"],
        additionalProperties: false,
      },
    },
    required: ["resource"],
    additionalProperties: false,
  };