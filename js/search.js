function search() {
	const title = document.getElementById("title").value;
	const artist = document.getElementById("artist").value;
	const genre = document.getElementById("genre").value;
	const detail = document.getElementById("detail").value;

	const query = `SELECT A, B, C WHERE B CONTAINS '${title}' AND C CONTAINS '${artist}' AND D CONTAINS '${genre}' AND E CONTAINS '${detail}' AND D IS NOT NULL ORDER BY C`
	const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?gid=${gid}&tq=${encodeURIComponent(query)}`;

	fetch(url)
		.then(res => res.text())
		.then(text => {
			const json = JSON.parse(text.substr(47).slice(0, -2)); // gvizの形式を整形
			const rows = json.table.rows;
			const headers = json.table.cols.map(col => col.label);

			const thead = document.querySelector("#resultTable thead");
			const tbody = document.querySelector("#resultTable tbody");
			thead.innerHTML = "<tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";
			tbody.innerHTML = rows.map(row => {
				return "<tr>" + row.c.map(cell => `<td>${cell ? cell.v : ""}</td>`).join("") + "</tr>";
			}).join("");
		})
		.catch(err => alert("検索に失敗しました: " + err));
}
