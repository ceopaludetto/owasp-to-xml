# Owasp to XML Supression

Convert your owasp vulnerabilities string into XML supressions automatically

## How to use

I don't want to transform this code into a package, so you'll need:

1. To clone the repo and install deps:

```sh
pnpm i
```

2. Create a input.txt file with the owasp result:

```txt
aws-json-protocol-2.17.267.jar (pkg:maven/software.amazon.awssdk/aws-json-protocol@2.17.267, cpe:2.3:a:amazon:aws-sdk-java:2.17.267:*:*:*:*:*:*:*, cpe:2.3:a:json-java_project:json-java:2.17.267:*:*:*:*:*:*:*) : CVE-2022-45688
jackson-core-2.13.4.jar (pkg:maven/com.fasterxml.jackson.core/jackson-core@2.13.4, cpe:2.3:a:fasterxml:jackson-modules-java8:2.13.4:*:*:*:*:*:*:*, cpe:2.3:a:json-java_project:json-java:2.13.4:*:*:*:*:*:*:*) : CVE-2022-45688
```

3. Run the script with:

```sh
pnpm start
```

4. See generated output.xml

## Why?

I hate to write owasp supressions manually, then I've created this script to write it down for me! 🤓
