addEventListener("fetch", (e) => {
  e.respondWith(handler(e.request));
});

const html = /* html */ `<!doctype html>
<html>
  <head>
    <title>What is my IP?</title>
  </head>
  <body>
    <div>IPv4: <span id="ipv4">loading...</span></div>
    <div>IPv6: <span id="ipv6">loading...</span></div>
    <script type="module">
      async function ipv4() {
        try {
          const req = await fetch("https://ipv4.debug.lcas.dev", { headers: { accept: "application/json" }});
          const { ip } = await req.json();
          document.getElementById("ipv4").innerText = ip;
        } catch(err) {
          document.getElementById("ipv4").innerText = "failed";
        }
      }
      async function ipv6() {
        try {
          const req = await fetch("https://ipv6.debug.lcas.dev", { headers: { accept: "application/json" }});
          const { ip } = await req.json();
          document.getElementById("ipv6").innerText = ip;
        } catch(err) {
          document.getElementById("ipv6").innerText = "failed";
        }
      }
      ipv4();
      ipv6();
    </script>
  </body>
</html>`;

function handler(request: Request): Response {
  const accepts = request.headers.get("accept") ?? "";
  const addr = request.headers.get("x-forwarded-for") ?? "";
  if (accepts.includes("text/html")) return new Response(html, { status: 200 });
  return new Response(JSON.stringify({ ip: addr }), {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
