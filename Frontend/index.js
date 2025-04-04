async function testMCP() {
  const installCode = document.getElementById("installCode").value;
  const resultDiv = document.getElementById("result");

  if (!installCode) {
    resultDiv.className = "error";
    resultDiv.innerHTML = "Please enter an installation code.";
    return;
  }

  resultDiv.className = "";
  resultDiv.innerHTML = "⏳ Testing MCP server...";

  try {
    const response = await fetch("https://mcp-backend-uifw.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ installationCode: installCode })
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.className = "success";
      resultDiv.innerHTML = `${data.message || "MCP Server Reachable!"}`;
    } else {
      resultDiv.className = "error";
      resultDiv.innerHTML = `Error: ${data.error || "Unknown error occurred."}`;
    }
  } catch (error) {
    resultDiv.className = "error";
    resultDiv.innerHTML = "Network error or server is not running.";
  }
}
