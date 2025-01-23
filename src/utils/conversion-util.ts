import _ from "lodash";

export class ConversionUtil {
  public static toCamelCase(data: any): any {
    if (_.isArray(data)) return data.map((v) => this.toCamelCase(v));

    if (_.isObject(data)) {
      return _.transform(data, (result, val, key) => {
        result[_.camelCase(key)] = this.toCamelCase(val);
      });
    }

    return data;
  }
}
