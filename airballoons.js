let margin = { top: 20, right: 20, bottom: 30, left: 40 }
let width = 1360
let height = 1000
let updateTime = 500
let selected = null;
let selectedColor = null
d3.json("Data/dataset.json")
    .then(dataset => {

        let createSvg = () =>
            d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let draw = (dataset) => {
            let balloons = svg.selectAll('.balloon').data(dataset)
            let baskets = svg.selectAll('.basket').data(dataset)

            balloons.exit().remove();
            baskets.exit().remove()
            console.log(dataset.length)
            balloons.enter().append("circle")
                .attr("class","balloon")
                .attr("cx", (d) => d.x)
                .attr("cy",(d) => d.y)
                .attr("r", (d) => d.balloon)
                .attr("fill", (d) => d.color)
                .on('click',(d)=>clickBehavior(d));
            baskets
                .enter().append("svg:image")
                .attr("class","basket")
                .attr("x",(d) => d.x - d.basket/2 )
                .attr("y", (d) => d.y + d.balloon -(d.balloon/14))
                .attr("xlink:href", "images/basket.svg")
                .attr("height", (d) => d.basket)
                .attr("width", (d) => d.basket)


            balloons.transition().duration(updateTime)
                .attr("cx", (d) => d.x)
                .attr("cy",(d) => d.y)
                .attr("r", (d) => d.balloon)
                .attr("fill", (d) => d.color)

            baskets.transition().duration(updateTime)
                .attr("x",(d) => d.x - d.basket/2 )
                .attr("y", (d) => d.y + d.balloon -(d.balloon/14))
                .attr("xlink:href", "images/basket.svg")
                .attr("height", (d) => d.basket)
                .attr("width", (d) => d.basket)




        }


        let svg = createSvg()
        draw(dataset)

        function clickBehavior(actualBalloon) {
            console.log(selected)
            if (selected === null){
                selected = actualBalloon
                return clickColor(actualBalloon)
            }
            return clickDimension(actualBalloon)
        }
        function clickDimension(actualBalloon) {
            let r1 = selected.balloon
            let r2 = actualBalloon.balloon
            let b1 = selected.basket
            let b2 = actualBalloon.basket
            selected.balloon = r2
            selected.basket = b2
            selected.color = selectedColor
            actualBalloon.balloon = r1
            actualBalloon.basket = b1
            selected = null
            draw(dataset)
        }

        function clickColor(actualBalloon){
            selectedColor = actualBalloon.color
            actualBalloon.color = "white"
            draw(dataset)
        }
    })

    .catch(error => {
        console.log(error)
    })



