import "isomorphic-fetch"
describe("Test API endpoint", () => {
 test("Test API HTTP 200", async () => {

    const res = await fetch(
        `https://oq3p80.deta.dev/`
    );
   expect(res.status).toEqual(200);
 });
})
