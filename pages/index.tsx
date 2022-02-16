import { NextPage } from "next";
import Page from "../components/Page";
import LandingPageTemplate from "../templates/LandingPage/LandingPageTemplate";

const Index: NextPage = () => {
  return (
    <Page title="learning-app" description="Generated by Create Next Stack.">
      <LandingPageTemplate />
    </Page>
  );
};

export default Index;
