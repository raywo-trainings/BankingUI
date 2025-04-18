import { TruncatedIdPipe } from "./truncated-id.pipe";


describe('TruncatedIdPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatedIdPipe();
    expect(pipe).toBeTruthy();
  });
});
