// This is where you'll put your existing JavaScript code
// Example of creating a simple UI element
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("app-container")
  
    if (container) {
      // Create a sample UI element
      const header = document.createElement("h2")
      header.textContent = "Hello from JavaScript!"
      header.style.color = "#0070f3"
  
      const paragraph = document.createElement("p")
      paragraph.textContent = "This UI is created with vanilla JavaScript."
      paragraph.style.marginTop = "1rem"
  
      const button = document.createElement("button")
      button.textContent = "Click me!"
      button.style.marginTop = "1rem"
      button.style.padding = "0.5rem 1rem"
      button.style.backgroundColor = "#0070f3"
      button.style.color = "white"
      button.style.border = "none"
      button.style.borderRadius = "0.25rem"
      button.style.cursor = "pointer"
  
      button.addEventListener("click", () => {
        alert("Button clicked!")
      })
  
      // Append elements to the container
      container.appendChild(header)
      container.appendChild(paragraph)
      container.appendChild(button)
    }
  })
  
  