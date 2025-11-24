truplace

## Testing Mode

For local development and testing, you can bypass email verification:

### Enable Testing Mode
Set the following environment variable in `.env`:
```
VITE_DISABLE_AUTH_FOR_TESTING=true
```

Then restart the dev server.

### What Testing Mode Does
- Bypasses email verification completely
- Auto-creates a test user (ID: `test-user-123`)
- Redirects directly to review submission form
- Shows yellow banner indicating testing mode is active
- Console warning displayed when active

### Disable Testing Mode
Remove or set to false in `.env`:
```
VITE_DISABLE_AUTH_FOR_TESTING=false
```

### Cleanup Test Data
To remove test reviews from the database:
```sql
DELETE FROM reviews WHERE user_id = 'test-user-123';
```
