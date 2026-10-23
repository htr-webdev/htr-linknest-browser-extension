document.addEventListener("DOMContentLoaded", async () => {
  const linksArea = document.querySelector(".links-area");
  const addButtons = document.querySelectorAll(".add-button, .empty-action");
  const searchInput = document.querySelector("#search");

  const STORAGE_KEY = "links";

  let links = [];
  let editingLinkId = null;
  let isLoading = true;
  let saveQueue = Promise.resolve();

  function createId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function normalizeUrl(value) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return null;
    }

    try {
      const url = new URL(
        /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(trimmedValue)
          ? trimmedValue
          : `https://${trimmedValue}`,
      );

      if (!["http:", "https:"].includes(url.protocol)) {
        return null;
      }

      return url.href;
    } catch {
      return null;
    }
  }

  async function loadLinks() {
    try {
      const result = await browser.storage.local.get(STORAGE_KEY);
      const storedLinks = result[STORAGE_KEY];

      links = Array.isArray(storedLinks) ? storedLinks : [];
    } catch (error) {
      console.error("Failed to load links:", error);
      links = [];
    } finally {
      isLoading = false;
      renderLinks();
    }
  }

  function saveLinks() {
    const linksToSave = links.map((link) => ({ ...link }));

    saveQueue = saveQueue
      .catch(() => {})
      .then(() =>
        browser.storage.local.set({
          [STORAGE_KEY]: linksToSave,
        }),
      )
      .catch((error) => {
        console.error("Failed to save links:", error);
      });

    return saveQueue;
  }

  function renderLinks() {
    linksArea.replaceChildren();

    if (isLoading) {
      const message = document.createElement("p");
      message.textContent = "Loading links...";
      linksArea.append(message);
      return;
    }

    const query = searchInput.value.trim().toLowerCase();

    const filteredLinks = links.filter((link) =>
      `${link.title} ${link.url}`.toLowerCase().includes(query),
    );

    if (filteredLinks.length === 0) {
      const heading = document.createElement("h3");
      const message = document.createElement("p");

      heading.textContent = query ? "No matching links" : "No links yet";
      message.textContent = query
        ? "Try a different search term."
        : "Your saved links will appear here.";

      linksArea.append(heading, message);

      if (!query) {
        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.className = "empty-action";
        addButton.textContent = "Add your first link";
        addButton.addEventListener("click", addLink);
        linksArea.append(addButton);
      }

      return;
    }

    filteredLinks.forEach((link) => {
      const item = document.createElement("article");
      item.className = "link-item";

      const details = document.createElement("div");
      details.className = "link-details";

      const title = document.createElement("a");
      title.className = "link-title";
      title.textContent = link.title;
      title.href = link.url;
      title.target = "_blank";
      title.rel = "noopener noreferrer";

      const address = document.createElement("p");
      address.className = "link-url";
      address.textContent = link.url;

      const actions = document.createElement("div");
      actions.className = "link-actions";

      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => editLink(link.id));

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteLink(link.id));

      details.append(title, address);
      actions.append(editButton, deleteButton);
      item.append(details, actions);
      linksArea.append(item);
    });
  }

  function addLink() {
    if (isLoading) {
      return;
    }

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Link title";
    titleInput.maxLength = 150;
    titleInput.required = true;

    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.placeholder = "https://example.com";
    urlInput.required = true;

    const form = document.createElement("form");
    form.className = "link-form";

    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = editingLinkId ? "Save changes" : "Add link";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", () => {
      editingLinkId = null;
      renderLinks();
    });

    form.append(titleInput, urlInput, saveButton, cancelButton);

    const existingForm = linksArea.querySelector(".link-form");

    if (existingForm) {
      existingForm.remove();
    }

    linksArea.prepend(form);

    if (editingLinkId) {
      const currentLink = links.find((link) => link.id === editingLinkId);

      if (currentLink) {
        titleInput.value = currentLink.title;
        urlInput.value = currentLink.url;
      }
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (saveButton.disabled) {
        return;
      }

      const title = titleInput.value.trim();
      const url = normalizeUrl(urlInput.value);

      if (!title) {
        titleInput.setCustomValidity("Please enter a link title.");
        titleInput.reportValidity();
        titleInput.setCustomValidity("");
        return;
      }

      if (!url) {
        urlInput.setCustomValidity("Enter a valid HTTP or HTTPS URL.");
        urlInput.reportValidity();
        urlInput.setCustomValidity("");
        return;
      }

      saveButton.disabled = true;

      if (editingLinkId) {
        links = links.map((link) =>
          link.id === editingLinkId ? { ...link, title, url } : link,
        );

        editingLinkId = null;
      } else {
        links.push({
          id: createId(),
          title,
          url,
        });
      }

      renderLinks();

      await saveLinks();
    });

    titleInput.focus();
  }

  function editLink(id) {
    editingLinkId = id;
    addLink();
  }

  async function deleteLink(id) {
    const confirmed = confirm("Are you sure you want to delete this link?");

    if (!confirmed) {
      return;
    }

    links = links.filter((link) => link.id !== id);

    renderLinks();

    await saveLinks();
  }

  addButtons.forEach((button) => {
    button.addEventListener("click", addLink);
  });

  searchInput.addEventListener("input", renderLinks);

  await loadLinks();
});
