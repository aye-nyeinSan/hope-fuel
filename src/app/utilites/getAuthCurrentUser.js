import {
  signInWithRedirect,
  signOut,
  getCurrentUser,
  AuthUser,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

// Function to get the current authenticated user's details
export default async function getAuthCurrentUser() {
  try {
    const user = await getCurrentUser() ;
    const { attributes, username, signInUserSession } = user;

    console.log(`The username: ${username}`);
    console.log(`User attributes: `, attributes);
    console.log(`Sign-in User Session: `, signInUserSession);
    handleFetchUserAttributes();
  } catch (err) {
    console.log("Error retrieving current user: ", err);
  }
}
import { fetchUserAttributes } from "aws-amplify/auth";

async function handleFetchUserAttributes() {
  try {
    const userAttributes = await fetchUserAttributes();
    console.log(userAttributes);
  } catch (error) {
    console.log(error);
  }
}
