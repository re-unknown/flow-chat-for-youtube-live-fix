# Flow Chat for YouTube Live Fix

[English README](README.md)

このリポジトリは
[subdiox/youtube-live-chat-flow](https://github.com/subdiox/youtube-live-chat-flow)
のフォークです。**Flow Chat for YouTube Live Fix** として公開しています。

元プロジェクトの MIT License と著作権表示は [LICENSE](LICENSE) に引き継いでいます。

> YouTube Live のチャットメッセージを動画上に流す Chrome 拡張機能です。

## このフォークでの変更点

- 現行の YouTube プレーヤーコントロールに合わせて、Flow Chat ボタンのレイアウトずれを修正しました。
- GPU とレンダリング負荷を抑えるための最適化と、軽量モードを追加しました。
- 拡張機能の設定画面を暫定的に英語と日本語の多言語表示に対応しました。
- 拡張機能名を **Flow Chat for YouTube Live Fix** に変更しました。

## 機能

- 動画上にチャットメッセージを流します。
- メッセージの色、サイズ、速度を変更できます。
- 投稿者名とアバターをメッセージに表示できます。
- Super Chat と Super Sticker を表示できます。
- チャット入力欄を動画下部のコントロールへ移動できます。
- チャット一覧に補助メニューボタンを追加できます。

## スクリーンショット

![screenshot](.github/img/screenshot1.gif)

## インストール

1. `yarn dev` を実行して、拡張機能用の `app` ディレクトリを用意します。
2. Brave の場合は `brave://extensions`、Chrome の場合は `chrome://extensions` を開きます。
3. **デベロッパーモード** を有効にします。
4. **パッケージ化されていない拡張機能を読み込む** を押して、このリポジトリ内の `app` ディレクトリを選択します。

## 開発

```bash
# 依存関係のインストール
yarn

# ファイル変更を監視して拡張機能を更新
yarn dev
```

## ライセンス

このプロジェクトは MIT License のもとで公開されています。元プロジェクトのライセンスと著作権表示は [LICENSE](LICENSE) に保持されています。
