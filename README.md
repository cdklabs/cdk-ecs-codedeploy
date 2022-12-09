# CDK ECS CodeDeploy

This project contains CDK constructs to support CodeDeploy ECS deployments.

## Local Development

```bash
yarn install
yarn build
yarn test
```

To run an integration test and update the snapshot, run:

```bash
yarn integ:deployment:deploy
```

To recreate snapshots for integration tests, run:

```bash
yarn integ:snapshot-all
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
