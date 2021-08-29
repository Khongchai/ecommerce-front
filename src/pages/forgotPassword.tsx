import { Box, Button, Stack, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/Formik/InputField";
import { FormContainer } from "../Elements/FormContainer";
import { useSendResetPasswordEmailMutation } from "../generated/graphql";
import useAuthRedirect from "../utils-hooks/useAuthRedirect";

const ForgotPassword: React.FC = ({}) => {
  useAuthRedirect("toHomeIfLoggedIn");
  const bg = useColorModeValue("mainGrey", "white");
  const bgFlip = useColorModeValue("white", "mainGrey");
  const [forgotPassword] = useSendResetPasswordEmailMutation();
  const [finishedMessage, setFinishedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <FormContainer>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async ({ email }) => {
          await forgotPassword({
            variables: { email },
          })
            .then(() => {
              setFinishedMessage(
                "Reset password email sent (if a user with the provided email exsits)"
              );
              setErrorMessage("");
            })
            .catch((error) => {
              setErrorMessage(
                "Send this error message to the admin: " + error.message
              );
              setFinishedMessage("");
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box as={Stack} mt={["6rem", null, "0"]} spacing="1.2rem">
              <InputField name="email" type="email" label="Email" />
              {finishedMessage && (
                <small style={{ color: "green" }}>{finishedMessage}</small>
              )}
              {errorMessage && (
                <small style={{ color: "red" }}>{errorMessage}</small>
              )}
              <Button
                mt={4}
                color={bgFlip}
                bg={bg}
                isLoading={isSubmitting}
                _hover={{ opacity: 0.7 }}
                type="submit"
              >
                Send Reset Password Link
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};
export default ForgotPassword;
