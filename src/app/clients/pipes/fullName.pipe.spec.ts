import { FullNamePipe } from "./fullName.pipe";


describe("FullNamePipe", () => {
  it("create an instance", () => {
    const pipe = new FullNamePipe();
    expect(pipe).toBeTruthy();
  });
});
