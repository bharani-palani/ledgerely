# Fix Duplicate Resources Error in mergeDebugAssets

The build is failing because the `assets` folder contains both compressed (`.gz`) and uncompressed versions of the same files (e.g., `index.html` and `index.html.gz`). Android's asset merger treats these as duplicate resources for the same target path.

## Proposed Changes

### Build Configuration

#### [MODIFY] [app/build.gradle](file:///Applications/MAMP/htdocs/ledgerely/android/app/build.gradle)

Update `aaptOptions.ignoreAssetsPattern` to include `*.gz` files. This will prevent the asset merger from trying to include the pre-compressed files, which are redundant as Android handles asset compression itself and they clash with the uncompressed versions.

```gradle
        aaptOptions {
             // ...
            ignoreAssetsPattern = '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~:*.gz'
        }
```

## Verification Plan

### Automated Tests
- Run `./gradlew :app:mergeDebugAssets` to verify the task completes successfully.
- Run `./gradlew :app:assembleDebug` to ensure the entire build passes.

### Manual Verification
- Verify that the app still loads correctly (the uncompressed `index.html` will be used).
