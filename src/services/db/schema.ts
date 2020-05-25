const snippetsSchema = {
  title: "Snippets schema",
  description: "describes a simple snippet",
  version: 1,
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
    lang: {
		type: "string",
	}
  },
  required: ["name", "contents"]
};

export default snippetsSchema;
