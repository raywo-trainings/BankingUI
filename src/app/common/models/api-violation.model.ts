export interface ApiViolation {

  field: string;
  constraint?: string;
  message: string;

}


export function violationToString(violation: ApiViolation): string {
  const strings = [
    `"${violation.field}"`,
    violation.constraint,
    violation.message
  ];

  return strings.filter(s => s).join(" ");
}
