$(function () {
	$("form#searchForm").on("submit", function (e) {
		e.preventDefault();

		let searchTerm = $("#searchTerm").val();

		let numRecords = parseInt($("#numRecords").val());

		let beginDate = $("#startYear").val();
		if (beginDate) {
			beginDate = beginDate.match(/\d+/g).join('')
			beginDate = "&begin_date=" + beginDate;
		}

		let endDate = $("#endYear").val();
		if (endDate) {
			endDate = endDate.match(/\d+/g).join('')
			endDate = "&end_date=" + endDate;
		}

		// console.log(beginDate)

		let queryString =
			"https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
			+ searchTerm
			+ beginDate
			+ endDate
			+ "&sort=relevance"
			+ "&api-key=N91g2FybbqotXrcwqlFCzGhdDQnNFcXT";

		$.get(queryString)
			.then(function (data) {
				let docs = data.response.docs;

				console.log(docs)

				let resultsArea = $(".searchResults");

				for (let i = 0; i < numRecords; i++) {
					resultsArea.append(
						$("<div>").append(
							$("<a>")
								.attr("href", docs[i].web_url)
								.text(docs[i].headline.main)
						)
					);
				}
			})
	});

	$(".reset").on("click", function (e) {
		$(".searchResults").empty();
	});


});