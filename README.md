# Hizu finale! — GitHub Pages更新版

公開元: https://github.com/totoadad/totoadad.github.io
比較元: 42cb4abd3b7e056d5bbd27063b2b3f23d0c2cbb5（2016-12-05）

## 更新内容

- GitHub Actionsによる静的サイト公開用ワークフローを追加。
- 公開前にローカル画像・CSS・JS・ページへの参照とJavaScript構文を検証。
- jQuery 1.7.1とBootstrap 2のJavaScriptを読み込まない構成へ変更。
- ナビゲーション、ドロップダウン、名刺の折りたたみを標準JavaScriptで実装。
- 閉じたスマホメニューのフォーカス制御と開閉状態の読み上げを改善。
- 古いIE用shim、旧Google Analytics（Universal Analytics）と外部ウィジェットのスクリプトを除去。新しい解析サービスは未設定。
- 共有は通常のリンクを使用。はてなブックマーク画像をHTTPSへ変更。
- 日本語ページのlangとviewportを整備。
- とびもりトップから各一覧へのリンクを同一サイト内の相対URLへ修正。

## 維持しているもの

本文・プロフィール・イベント履歴・画像・配色・ページURLを維持しています。
デザイン維持のためBootstrap 2.1.1のCSSはそのまま残しています。Bootstrap最新版への全面移行ではありません。
とびもりの既存TINY.tableスクリプトとデータも維持しています。
外部リンクの移転・サービス終了は全件調査していません。

## 公開手順

1. 「totoadad」のGitHubアカウントで対象リポジトリを開きます。
2. このフォルダの内容を作業ブランチに反映します（.github、.gitignore、.nojekyllも含む）。元の公開内容はGit履歴から戻せます。
3. Pull requestで変更内容とActionsのbuild成功を確認してmasterへ取り込みます。
4. リポジトリのSettings → Pages → Build and deployment → Sourceを「GitHub Actions」に設定します。
5. Actionsの「Publish GitHub Pages」を必要に応じて手動実行します。
6. deploy成功と https://totoadad.github.io/ の表示を確認します。

旧js/bootstrap.jsとjs/bootstrap.min.jsは更新版から削除しています。アップロードで反映する場合は元リポジトリに残っていても読み込まれません。
公開設定の切り替えと本番のActions実行は未実施です。

## ローカル確認

Node.jsの現行LTSで次を実行します。追加パッケージは不要です。

    node scripts/build.mjs

公開対象だけが_siteにコピーされます。README、scripts、Git設定は公開対象に含みません。

## 確認結果（2026-10-29）

- 6ページすべてで本文テキストの保持を比較確認。
- ローカル参照60件とJavaScript構文を検証。
- PC版トップの主要5領域の位置・サイズが変更前と一致。
- 幅390pxでメニュー開閉とドロップダウンを確認。
- PCのドロップダウンとEscape、名刺の組み立て方の開閉を確認。
- 誕生日一覧：350件 →「ロボ」で1件 → resetで350件。
- 喫茶一覧：「ブレンド」で80件。
- スケジュール29行を確認。
- 本番公開、GitHub Actions上での実行、外部サービスの全リンク確認は未実施。

公式資料:
https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
