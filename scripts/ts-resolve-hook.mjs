/**
 * Lets Node's type-stripping loader follow the repo's extensionless TS imports.
 * Used only by scripts/verify-event-shift.mjs.
 */
export async function resolve(specifier, context, nextResolve) {
  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    !/\.[cm]?[jt]s$/.test(specifier)
  ) {
    return nextResolve(`${specifier}.ts`, context);
  }
  return nextResolve(specifier, context);
}
