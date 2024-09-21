export default function highlightElementById(elementId: string) {
  // Find the element by its ID
  const element = document.getElementById(elementId);

  if (element) {
    // Scroll the element into view
    element.scrollIntoView({ behavior: "smooth", block: "center" });

    // Add a highlight style (you can customize this)
    element.style.transition = "background-color 0.5s ease";
    element.style.backgroundColor = "#475569";

    // Optionally, remove the highlight after a few seconds
    setTimeout(() => {
      element.style.backgroundColor = "";
    }, 2000);
  } else {
    console.error(`Element with ID "${elementId}" not found.`);
  }
}
