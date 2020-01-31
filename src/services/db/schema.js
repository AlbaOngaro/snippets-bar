const snippetsSchema = {
  title: "Snippets schema",
  description: "describes a simple snippet",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true
    },
    name: {
      type: "string"
    },
    contents: {
      type: "string"
	},
	editing: {
		type: "boolean",
		default: false,
	},
	saved: {
		type: "boolean",
		default: true,
	},
    tags: {
      type: ["array", "null"],
      items: {
        type: "string"
      }
    }
  },
  required: ["name", "contents"]
};

export default snippetsSchema;
