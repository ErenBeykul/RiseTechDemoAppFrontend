import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { PeoplePage } from "./modules/PhonebookOperations/pages/people/PeoplePage";
import { PersonEdit } from "./modules/PhonebookOperations/pages/people/person-edit/PersonEdit";

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/kisiler" />
        }
        <ContentRoute path="/kisiler/duzenle/:id" component={PersonEdit} />
        <ContentRoute path="/kisiler/ekle" component={PersonEdit} />
        <ContentRoute path="/kisiler" component={PeoplePage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
