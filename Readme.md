## Introduction
[![CodeQL](https://github.com/litentry/litentry-app/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/litentry/litentry-app/actions/workflows/codeql-analysis.yml)
[![Code Style & Lint](https://github.com/litentry/litentry-app/actions/workflows/code-style-lint.yml/badge.svg)](https://github.com/litentry/litentry-app/actions/workflows/code-style-lint.yml)

Aggregated identity means an identity linked with accounts from different blockchains and off-chain applications/services, which represent the owner behind the accounts, and further present the owner's credibility and reputation from various aspects. In this repo, we provide a governance app, with gathered participants' info integration. It could facilitate the governance process, integrate participants' more information from linked accounts on other networks, and encourage more users to join on-chain governance once we provide Litentry native token as incentives.


With this app, we want to create a governance mobile application which could:

* Offer native governance support integration to Polkadot UI and Polkassembly off-chain discussion.
* Improve user engagement by allowing them to receive and customize Push Notification of governance-related updates.
* Provide participants with good governance statistics and gamification score to incentive users to join governance.

## Development

* `yarn` => install dependencies
* `yarn start` => start bundler

* **iOS**:  `npx pod-install ios; yarn ios` => install pod and start simulator
* **Android** `yarn android`

> Note: For first time user, be sure to checout official [Get Started](https://reactnative.dev/docs/getting-Started)

## Misc

### Distinct colors
https://sashamaps.net/docs/resources/20-colors/


### Development

Litentry test network

wss://18.140.130.138
