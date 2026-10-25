# GitHub protection setup

Repository: `Dvihndg/tms-portal-k15c6`

Đã tạo:

- Private repository.
- `main` làm default production branch.
- `develop` làm integration branch.
- Workflow kiểm tra branch `feature/*` và tối thiểu 01 approval trong PR vào `develop`.

GitHub API hiện trả về HTTP 403: `Upgrade to GitHub Pro or make this repository public to enable this feature` khi bật branch protection cho private repository. Vì vậy không ghi nhận protection là đã bật khi GitHub chưa chấp nhận.

Sau khi đủ điều kiện, chạy:

```bash
gh api -X PUT repos/Dvihndg/tms-portal-k15c6/branches/develop/protection \\
  -H 'Accept: application/vnd.github+json' \\
  --input protection.json
```

Payload cần có `required_pull_request_reviews.required_approving_review_count = 1`, `dismiss_stale_reviews = true`, `required_conversation_resolution = true`, `allow_force_pushes = false` và `allow_deletions = false`.
