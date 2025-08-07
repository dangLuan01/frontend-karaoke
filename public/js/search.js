document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("searchbox");
    const dropdown = document.getElementById("search-dropdown");
    /** @type {ReturnType<typeof setTimeout> | null} */
    let timeout = null;
    input.addEventListener("focus", () => {
        dropdown.classList.add("show");
    });
    input.addEventListener("input", function () {
        // Clear previous timer
        if (timeout) clearTimeout(timeout);
        const query = input.value.trim();
        if (query === "") {
            dropdown.innerHTML = `
            <div class="search-item">
                <div class="row g-2">
                    <div class="col-auto">
                        
                    </div>
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center">
                            <strong>Vui lòng nhập tên bài hát</strong>
                        </div>
                        <small class="text-muted"></small>
                    </div>
                </div>
            </div>
             <div class="search-item text-center text-primary fw-bold">
               Không tìm thấy
            </div>
            `;
            dropdown.classList.remove("show");
            return;
        }
        dropdown.innerHTML = `
        <div class="search-item text-center text-muted">
			<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
			Đang tìm kiếm...
		</div>
        `;
        // Delay API call by 1s
        timeout = setTimeout(() => {
            fetch(`http://localhost:8080/api/v1/song/search?search=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(results => {
                    dropdown.innerHTML = ""; // Clear previous results
                    if (!results.data || results.data.length === 0) {
                        dropdown.innerHTML = `<div class="search-item text-center text-muted">Không tìm thấy kết quả</div>`;
                        dropdown.classList.add("show");
                        return;
                    }
                    results.data.forEach(item => {
                        const el = document.createElement("div");
                        el.className = "search-item";
                        el.innerHTML = `
                        <a href="/song/${item.uuid}">
                            <div class="row g-2">
                                <div class="col-auto">
                                    <img src="${item.thumbnail}" class="img-box rounded" />
                                </div>
                                <div class="col">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <strong>${item.name}</strong>
                                        <span class="tag module">${item.tune || ''}</span>
                                    </div>
                                    <small class="text-muted">${item.author || 'Không xác định'} - ${ item.singer || 'Không xác định' }</small><br/>
                                    <small class="text-muted">${item.lyrics || 'Không xác định'}</small>
                                </div>
                            </div>
                        </a>
                        `;
                        dropdown.appendChild(el);
                    });
                    dropdown.classList.add("show");
                })
                .catch(err => {
                    console.error("Lỗi khi tìm kiếm:", err);
                    dropdown.innerHTML = `<div class="search-item text-danger text-center">Lỗi kết nối tới API</div>`;
                    dropdown.classList.add("show");
                });
        }, 2000);
    });
    // Hide dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove("show");
        }
    });
});