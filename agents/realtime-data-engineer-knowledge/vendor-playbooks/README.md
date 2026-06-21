# vendor-playbooks/ — seeding convention

Holds per-platform capability notes and trade-offs for streaming/ingestion tools.

**What belongs here:** Kafka/Confluent, Apache Flink, Redpanda, AWS Kinesis, Debezium,
and wire-feed sources — what each is strong at, where it struggles, operational and
cost constraints, and the delivery guarantees each actually provides.

**Each file needs:** the platform, the capability claim, a `Last verified:` date (these
go stale fast), a `Source:` citation, and a confidence tag. Stay vendor-neutral — name
trade-offs honestly. After adding a file, bump `vendor-playbooks` in `INDEX.md`
`seed_counts`.
