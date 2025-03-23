import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { signPassword } from "../../utilities/hashing";
dotenv.config();

describe("testing hashing functions", () => {
  it("should return a 60 character hash when entering a password", () => {
    expect(signPassword("fsf434fsdiofjsdoijfpdisojfpsdiojfiosdjfiodsjfpiosdjfiposdjfiovmcmcr843084jffrjop4f").length).toBe(60);
  });
});
