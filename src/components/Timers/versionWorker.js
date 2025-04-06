import packageJson from "../../../package.json";

const script = setInterval(
  () => {
    fetch(`${process.env.PUBLIC_URL}/meta.json?cacheDate=${Date.now()}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then(r => r.json())
      .then(data => {
        if (data.version !== `${packageJson.version}`) {
          postMessage(data.version);
        }
      })
      .catch(() => {
        postMessage(false);
      });
  },
  1000 * 5 * 60,
);

export default script;
