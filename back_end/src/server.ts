import app, { init } from "@/app";

const port = + process.env.PORT || 4000;

export default async function server() {
  init().then( async () => {
    (await app()).listen(port, () => {
      /* eslint-disable-next-line no-console */
      console.log(`Server is listening on port ${port}.`);
    });
  });
}

server();