
module.exports = async function (flow = "standard") {
    const response = await fetch(
      `https://bamanchange.com/exchange/api/currencies?raw=true&active=true&flow=${flow}&buy=true&sell=true`
    );
    let initData = await response.json();
    let final = [];
    let finalData;
    let checker = "";
    for (let i = 0; i < initData.length; i++) {
      if (checker === initData[i].ticker) {
        final[final.length - 1].network.push(initData[i].network);
        final[final.length - 1].image.push(initData[i].image);
      } else {
        initData[i].network = [initData[i].network];
        initData[i].image = [initData[i].image];
        final.push(initData[i]);
      }
      checker = initData[i].ticker;
    }
    finalData = final.map((x) => {
      let rr = x.name.split(" (");
      x.name = rr[0];
      return x;
    });
    return finalData;
  };