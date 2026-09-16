const markdownInput = document.getElementById('markdown-input');
const htmlOutput = document.getElementById('html-output');
const preview = document.getElementById('preview');

function convertMarkdown() {
    const input = document.getElementById('markdown-input').value;
    let html = input;

    // Convert Headings (h3 -> h2 -> h1)
    html = html.replace(/^\s*###\s+(.*)$/gm, '<h3>$1</h3>');
    html = html.replace(/^\s*##\s+(.*)$/gm, '<h2>$1</h2>');
    html = html.replace(/^\s*#\s+(.*)$/gm, '<h1>$1</h1>');

    // Convert Blockquotes
    html = html.replace(/^\s*>\s+(.*)$/gm, '<blockquote>$1</blockquote>');

    // Convert Images (must run before Links)
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');

    // Convert Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Convert Bold text (** or __)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Convert Italic text (* or _)
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Remove line breaks to concatenate output elements
    html = html.replace(/[\r\n]+/g, '');

    return html;
}

markdownInput.addEventListener('input', () => {
    const convertedHTML = convertMarkdown();
    htmlOutput.textContent = convertedHTML;
    preview.innerHTML = convertedHTML;
});
