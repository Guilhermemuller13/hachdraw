let currentPage = 1;
let totalRecords = 0;
let controller = undefined;

const handlePaginateDraw = (type) => {
  let page = currentPage;
  switch (type) {
    case "prev-page": {
      page--;
      break;
    }
    case "prev-lot-page": {
      page -= 10;
      break;
    }
    case "next-page": {
      page++;
      break;
    }
    case "next-lot-page": {
      page += 10;
      break;
    }
    default: {
      break;
    }
  }

  if (page <= 0) {
    currentPage = 1;
  } else {
    currentPage = page;
  }

  paginateDrawService(currentPage);
};

const paginateDrawService = async (page) => {
  if (Boolean(controller)) {
    controller.abort();
  }
  controller = new AbortController();
  const signal = controller.signal;
  const url = "https://api-hachuraservi1.websiteseguro.com/api/document";
  const headers = new Headers();
  headers.append(
    "Authorization",
    "Basic 96f9c92582aed580ba10a780e8af7fea57531c9c"
  );
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const bodyData = new URLSearchParams();
  bodyData.append("page", page);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: bodyData,
      signal: signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const totalPagesElement = document.querySelector("#total-pages");
    totalPagesElement.textContent = `${page}/1493`;

    const jsonParsed = await response.json();
    setBackgroundCanvas(jsonParsed.image);

    controller = undefined;
  } catch (error) {
    controller = undefined;
    if (error.name === "AbortError") {
      console.log("A requisição foi cancelada.");
    } else {
      console.error("Erro:", error);
    }
  }
};
