define({ "api": [
  {
    "type": "post",
    "url": "/block",
    "title": "As a user, I need an API to block updates from an email address.",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "requestor",
            "description": "<p>requestor email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "target",
            "description": "<p>target email address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n \"requestor\": \"lisa@example.com\",\n  \"target\": \"john@example.com\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.success",
            "description": "<p>requestor blocked the target successfully.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "PostBlock"
  },
  {
    "type": "post",
    "url": "/commonFriends",
    "title": "As a user, I need an API to retrieve the common friends list between two email addresses.",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "friends",
            "description": "<p>friends array mentioning two friends email id to find common friends.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"friends\":\n  [\n   \"andy@example.com\",\n  \"john@example.com\"\n  ]\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.success",
            "description": "<p>common friends exists</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.friends",
            "description": "<p>list of common  friends emails address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.count",
            "description": "<p>common friends list count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"friends\" :\n    [\n     'common@example.com'\n     ],\n    \"count\" : 1\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "PostCommonfriends"
  },
  {
    "type": "post",
    "url": "/connect",
    "title": "create a friend connection between two email addresses",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "friends",
            "description": "<p>Friends array to create a connect in between them</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"friends\":\n  [\n   \"andy@example.com\",\n  \"john@example.com\"\n  ]\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.success",
            "description": "<p>Two friends are connected successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 OK\n{\n  \"success\": true\n}",
          "type": "json"
        },
        {
          "title": "Success",
          "content": "HTTP/1.1 200 ACCEPTED\n{\n  \"success\": \"connection already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "PostConnect"
  },
  {
    "type": "post",
    "url": "/friendList",
    "title": "As a user, I need an API to retrieve the friends list for an email address.",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>input the emails address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": " {\n    \"email\": 'andy@example.com'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.success",
            "description": "<p>connection success</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "success.friends",
            "description": "<p>friendsList</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "success.count",
            "description": "<p>friendsList count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200 OK\n{\n   \"success\": true,\n   \"friends\" :\n               [\n                   'john@example.com'\n               ],\n   \"count\" : 1\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "PostFriendlist"
  },
  {
    "type": "post",
    "url": "/recipientList",
    "title": "As a user, I need an API to retrieve all email addresses that can receive updates from an email address.",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>sender email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>text message to send</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"sender\":  \"john@example.com\",\n     \"text\": \"Hello World! kate@example.com\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.success",
            "description": "<p>fetch of reciepients</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "success.recipients",
            "description": "<p>list of reciepients who are supposed to recieve the text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "success",
          "content": "  HTTP/1.1 200 OK\n{\n\"success\": true\n \"recipients\":\n     [\n     \"lisa@example.com\",\n     \"kate@example.com\"\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "PostRecipientlist"
  },
  {
    "type": "post",
    "url": "/subscribe",
    "title": "As a user, I need an API to subscribe to updates from an email address.",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "requestor",
            "description": "<p>email addres of the requestor from-subscriber</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "target",
            "description": "<p>email addres of the target subscribed-to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n \"requestor\": \"lisa@example.com\",\n  \"target\": \"john@example.com\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success.success",
            "description": "<p>requestor is subscribed with target</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 OK\n{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "PostSubscribe"
  }
] });
