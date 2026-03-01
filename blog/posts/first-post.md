# Building Scalable Orchestration

**February 28, 2026**

Designing distributed systems at scale requires a fundamental shift in how we think about state, failure, and recovery. In my experience building compute orchestration infrastructure, the most critical lesson is that *everything fails eventually*.

## The Fallacies of Distributed Computing

When moving from single-machine monoliths to global fleets, developers often bring assumptions that break down at scale:

1. **The network is reliable:** It isn't. Packets drop, switches fail, and links saturate. Your orchestration system must retry intelligently with exponential backoff and jitter.
2. **Latency is zero:** Cross-region calls take hundreds of milliseconds. When orchestrating millions of VMs, synchronous RPCs block threads and cause cascading failures. Embrace asynchronous, event-driven architectures.
3. **Topology doesn't change:** Racks are added, datacenters go offline, and VMs migrate. Hardcoding topology guarantees future outages.

## Embrace Eventual Consistency

Strong consistency (like a traditional SQL database) is a bottleneck at global scale. For orchestration, we rely on **eventual consistency**. When a user requests a new VM, the API gateway synchronously records the intent, but the actual provisioning happens asynchronously via background workers pulling from distributed queues.

This decouples the control plane from the data plane. If the underlying hypervisor API becomes slow, the user's intent is still captured; the system simply takes longer to reach the desired state.

*This is a sample markdown post rendered natively in the browser via marked.js.*
