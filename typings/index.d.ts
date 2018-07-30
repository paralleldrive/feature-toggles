declare module '@paralleldrive/feature-toggles' {
  interface Feature {
    readonly name: string;
    readonly isActive: boolean;
    readonly dependencies?: ReadonlyArray<string>;
  }

  interface Query {
    readonly ft: string;
  }

  interface Req {
    readonly query: Query;
  }

  function activateFeatures(
    featureNamesToEnable: ReadonlyArray<string>
  ): (features: ReadonlyArray<Feature>) => ReadonlyArray<Feature>;
  export { activateFeatures };

  function getActiveFeatureNames(
    features: ReadonlyArray<Feature>
  ): ReadonlyArray<string>;
  export { getActiveFeatureNames };

  function getQueryFeatureNames(query?: Query): ReadonlyArray<string>;
  export { getQueryFeatureNames };

  function mergeFeatureNames(
    currentFeatures: ReadonlyArray<string>, // tslint:disable-next-line:readonly-array
    ...restOfFeatures: Array<ReadonlyArray<string>>
  ): ReadonlyArray<string>;
  export { mergeFeatureNames };

  function removeFeatureNames(
    currentFeatures: ReadonlyArray<string>,
    features: ReadonlyArray<string>
  ): ReadonlyArray<string>;
  export { removeFeatureNames };

  function isActiveFeatureName(
    name: string,
    currentFeatures: ReadonlyArray<string>
  ): boolean;
  function isActiveFeatureName(
    name: string
  ): (currentFeatures: ReadonlyArray<string>) => boolean;
  export { isActive };

  function getReqQueryFeatureNames(req?: Req): ReadonlyArray<string>;
  export { getReqQueryFeatureNames };

  function getBrowserQueryFeatureNames(search?: string): ReadonlyArray<string>;
  export { getBrowserQueryFeatureNames };

  function getCurrentActiveFeatureNames(obj: {
    readonly initialFeatures: ReadonlyArray<Feature>;
    readonly req?: Req;
    readonly search?: string;
  }): ReadonlyArray<string>;
  export { getCurrentActiveFeatureNames };
}
