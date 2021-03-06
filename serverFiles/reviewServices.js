/*jshint node:true*/

module.exports = function () {

    var fs = require('fs'),
        reviews = JSON.parse(fs.readFileSync('serverData/reviews.json'));

    return {
        getReviews: function (request, response, next) {
            var id = request.params.id,
                found = false,
                arr = [];

            for (var i = 0; i < reviews.length && !found; ++i) {
                if (reviews[i].id == id) {
                    arr = reviews[i].stars;
                    found = true;
                }
            }

            response.send(arr);
        },

        createReview: function (request, response, next){
            var id = request.params.objID;

            var data = '';
            request.on('data', function (chunk) {
                data += chunk;
            });

            request.on('end', function () {
                data = JSON.parse(data);
                var revObj = {
                    name: data.name,
                    text: data.text
                },
                    added = false;

                for (var i = 0; i < reviews.length; ++i) {
                    if (id == reviews[i].id) {
                        reviews[i].stars[data.stars - 1].reviews.push(revObj);
                        added = true;
                        response.send(reviews[i].stars);
                        break;
                    }
                }

                if (!added) {
                    var starsArr = [];
                    for (var j = 0; j < 5; ++j) {
                        starsArr.push({ reviews: [] });
                    }

                    starsArr[data.stars - 1].reviews.push(revObj);

                    reviews.push({
                        id: id,
                        stars: starsArr
                    });
                    response.send(starsArr);
                }
            });
        }
    };
};
