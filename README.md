# Sourcegraph Custom References

A Sourcegraph extension allowing you to add reference finding for custom entities (HTTP routes, build tasks, string literals...) using regular expressions.

## Configuration

Custom references can be added through the `"customReferences"` property of the Sourcegraph client settings. Here is an example configuration to add reference finding for HTTP routes in go:

```
"customReferences": [
    {
      "name": "HTTP Route",
      "preview": ": `\"/$1\"`",
      "definitions": [{
          "search": "/httpPost\\(ctx, req.Repo, \"$1/",
          "capture": "httpPost\\(ctx, req\\.Repo, \"/?([^\"]+)\""
        }],
      "references": [{
          "search": "mux.HandleFunc\\(\\\"\\/$1",
          "capture": "mux.HandleFunc\\(\"/([^\"]+)"
      }],
      "implementations": [],
    }
  ]
```

With this configuration, hovering HTTP route definitions will trigger a tooltip a tooltip allowing to find references:

![example](./example.png)
