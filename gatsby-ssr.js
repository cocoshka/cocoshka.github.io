/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';
import i18n from './src/i18n';
import { I18nextProvider } from 'react-i18next';
import { PageContextProvider } from "./src/context"

export const wrapRootElement = ({ element }) => {
  return <I18nextProvider i18n={i18n}>{element}</I18nextProvider>;
};

export const wrapPageElement = ({ element, props }) => {
  return <PageContextProvider pageContext={props.pageContext}>{element}</PageContextProvider>;
};
