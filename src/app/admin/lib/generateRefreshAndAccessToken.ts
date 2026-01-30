import User from "./models/user.model";

interface GenerateTokensResponse {
    accessToken: string;
    refreshToken: string;
  }
  
  export const generateAccessAndRefreshToken = async (
    userId: string
  ): Promise<GenerateTokensResponse> => {
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error("User not found");
      }
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
  
      await user?.save({
        validateBeforeSave: false,
      });
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error("Error generating tokens:", error);
  
      throw Error(
        "Sometin went wrong while generating access Token and Refres Token"
      );
    }
  };