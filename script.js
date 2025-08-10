// @ts-nocheck
// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const targetWordDisplay = document.getElementById('targetWordDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const livesDisplay = document.getElementById('livesDisplay');
const highScoreDisplay = document.getElementById('highScoreDisplay'); // ハイスコア表示用
const messageDisplay = document.getElementById('messageDisplay');
const startButton = document.getElementById('startButton');

const TILE_SIZE = 25; // 各タイルのサイズ
const GRID_WIDTH = canvas.width / TILE_SIZE; // 20
const GRID_HEIGHT = canvas.height / TILE_SIZE; // 20

// === 単語リスト ===
const wordList = [
    { english: 'am', japanese: '午前' },
    { english: 'about', japanese: 'について、に関する' },
    { english: 'activity', japanese: '活動' },
    { english: 'actor', japanese: '俳優' },
    { english: 'after', japanese: '～のあとに' },
    { english: 'afternoon', japanese: '午後' },
    { english: 'again', japanese: 'もう一度、再び、また' },
    { english: 'against', japanese: 'に対抗して、反対して' },
    { english: 'age', japanese: '年齢' },
    { english: 'all', japanese: '全部、全員、全て、みな' },
    { english: 'along', japanese: 'に沿って' },
    { english: 'also', japanese: 'もまた' },
    { english: 'also', japanese: 'さらに' },
    { english: 'always', japanese: 'いつも' },
    { english: 'am', japanese: 'です、ます' },
    { english: 'am', japanese: 'にいる、ある' },
    { english: 'an', japanese: '1つの、1人の' },
    { english: 'and', japanese: 'それと' },
    { english: 'and', japanese: 'そして、それから' },
    { english: 'and so on', japanese: 'など' },
    { english: 'animal', japanese: '動物' },
    { english: 'another', japanese: 'ほかの、別の' },
    { english: 'apple', japanese: 'りんご' },
    { english: 'April', japanese: '４月' },
    { english: 'apron', japanese: 'エプロン、前かけ' },
    { english: 'are', japanese: 'です、ます' },
    { english: 'are', japanese: 'にいる、ある' },
    { english: 'area', japanese: '区域、場所、地域' },
    { english: 'around', japanese: 'の近くに' },
    { english: 'around', japanese: 'のまわりを回って' },
    { english: 'around', japanese: 'のあちこちに' },
    { english: 'around', japanese: 'あちこち、めぐって' },
    { english: 'art', japanese: '美術' },
    { english: 'as', japanese: 'として' },
    { english: 'at', japanese: '【場所】に、で' },
    { english: 'at', japanese: '【時刻・年齢】に' },
    { english: 'at', japanese: '【方向】をめがけて、に向かって' },
    { english: 'ate', japanese: '食べた（過去形）' },
    { english: 'August', japanese: '8月' },
    { english: 'autumn', japanese: '秋' },
    { english: 'away', japanese: 'はなれて、去って' },
    { english: 'back', japanese: '戻って、返して' },
    { english: 'bad', japanese: '悪い' },
    { english: 'That\'s too bad', japanese: 'それはいけませんね。' },
    { english: 'bag', japanese: 'かばん' },
    { english: 'baseball', japanese: '野球' },
    { english: 'bath', japanese: '入浴' },
    { english: 'be', japanese: 'である、になる' },
    { english: 'beach', japanese: '浜、海辺' },
    { english: 'bean', japanese: '豆' },
    { english: 'bear', japanese: 'クマ' },
    { english: 'beautiful', japanese: '美しい' },
    { english: 'become', japanese: 'になる' },
    { english: 'bed', japanese: 'ベッド' },
    { english: 'before', japanese: 'の前に' },
    { english: 'behind', japanese: 'の後ろに' },
    { english: 'best', japanese: '最も良い' },
    { english: 'do one\'s best', japanese: '最善をつくす' },
    { english: 'bicycle', japanese: '自転車' },
    { english: 'big', japanese: '大きい' },
    { english: 'bike', japanese: '自転車' },
    { english: 'bird', japanese: '鳥' },
    { english: 'birthday', japanese: '誕生日' },
    { english: 'black', japanese: '黒い' },
    { english: 'blue', japanese: '青い' },
    { english: 'body', japanese: '身体' },
    { english: 'book', japanese: '本' },
    { english: 'bookstore', japanese: '本屋' },
    { english: 'borrow', japanese: 'を借りる' },
    { english: 'bought', japanese: '買った（過去形）' },
    { english: 'box', japanese: '箱' },
    { english: 'boy', japanese: '少年' },
    { english: 'bread', japanese: 'パン' },
    { english: 'breakfast', japanese: '朝食' },
    { english: 'brother', japanese: '兄弟' },
    { english: 'brown', japanese: '茶色' },
    { english: 'brush', japanese: 'をみがく' },
    { english: 'build', japanese: 'を建てる' },
    { english: 'busy', japanese: '忙しい' },
    { english: 'but', japanese: 'しかし、けれども' },
    { english: 'buy', japanese: 'を買う' },
    { english: 'by', japanese: '【手段・方法・原因】によって' },
    { english: 'by', japanese: '【場所】のそばに' },
    { english: 'cake', japanese: 'ケーキ' },
    { english: 'came', japanese: '来た（過去形）' },
    { english: 'can', japanese: '【能力・可能】することができる' },
    { english: 'cannot', japanese: 'できない' },
    { english: 'cap', japanese: '帽子' },
    { english: 'car', japanese: '自動車' },
    { english: 'care', japanese: '世話' },
    { english: 'take care of', japanese: 'を大事にする' },
    { english: 'careful', japanese: '注意深い' },
    { english: 'cat', japanese: '猫' },
    { english: 'chair', japanese: 'いす' },
    { english: 'chicken', japanese: '鶏肉' },
    { english: 'child', japanese: '子供' },
    { english: 'children', japanese: '子供たち' },
    { english: 'choose', japanese: 'を選ぶ' },
    { english: 'city', japanese: '市、都会、都会' },
    { english: 'classmate', japanese: '同級生' },
    { english: 'classroom', japanese: '教室' },
    { english: 'clean', japanese: 'きれいな、清潔な' },
    { english: 'clean', japanese: 'きれいにする' },
    { english: 'climb', japanese: 'を登る' },
    { english: 'clothes', japanese: '服' },
    { english: 'cloudy', japanese: '曇った' },
    { english: 'cold', japanese: '冷たい、寒い' },
    { english: 'collect', japanese: 'を集める' },
    { english: 'come', japanese: '来る' },
    { english: 'cook', japanese: '料理する' },
    { english: 'cool', japanese: 'かっこいい' },
    { english: 'could', japanese: 'できた' },
    { english: 'country', japanese: '国' },
    { english: 'of course', japanese: 'もちろん' },
    { english: 'cousin', japanese: 'いとこ' },
    { english: 'cow', japanese: 'ウシ' },
    { english: 'cup', japanese: 'カップ' },
    { english: 'cute', japanese: 'かわいい' },
    { english: 'date', japanese: '日、日付' },
    { english: 'day', japanese: '日、１日' },
    { english: 'dear', japanese: '親愛なる' },
    { english: 'December', japanese: '12月' },
    { english: 'delicious', japanese: 'おいしい' },
    { english: 'desk', japanese: '机' },
    { english: 'dictionary', japanese: '辞書' },
    { english: 'different', japanese: '色々な、違った' },
    { english: 'difficult', japanese: '難しい' },
    { english: 'dinner', japanese: '夕食' },
    { english: 'dish', japanese: '皿、料理' },
    { english: 'do', japanese: 'をする、行う' },
    { english: 'doctor', japanese: '医者' },
    { english: 'dog', japanese: 'イヌ' },
    { english: 'door', japanese: '戸' },
    { english: 'down', japanese: '下に' },
    { english: 'down', japanese: 'に沿って' },
    { english: 'drama', japanese: '劇' },
    { english: 'draw', japanese: '描く、引く' },
    { english: 'dream', japanese: '夢' },
    { english: 'drink', japanese: 'を飲む' },
    { english: 'drop', japanese: 'を落とす' },
    { english: 'drum', japanese: '太鼓、ドラム' },
    { english: 'during', japanese: '～の間' },
    { english: 'each', japanese: 'それぞれの、各自の' },
    { english: 'each other', japanese: 'お互いに' },
    { english: 'ear', japanese: '耳' },
    { english: 'early', japanese: '早く' },
    { english: 'early', japanese: '早い' },
    { english: 'easily', japanese: '簡単に' },
    { english: 'eat', japanese: 'を食べる、食事をする' },
    { english: 'egg', japanese: '卵' },
    { english: 'eight', japanese: '8' },
    { english: 'eighteen', japanese: '18' },
    { english: 'eighth', japanese: '8番目' },
    { english: 'eighty', japanese: '80' },
    { english: 'elementary school', japanese: '小学校' },
    { english: 'eleven', japanese: '11' },
    { english: 'eleventh', japanese: '11番目' },
    { english: 'end', japanese: '最後' },
    { english: 'English', japanese: '英語' },
    { english: 'enjoy', japanese: 'を楽しむ' },
    { english: 'evening', japanese: '夕方' },
    { english: 'event', japanese: '行事' },
    { english: 'every', japanese: '毎、ごとに' },
    { english: 'everyone', japanese: 'みんな' },
    { english: 'excited', japanese: 'わくわくした' },
    { english: 'exciting', japanese: '興奮させる' },
    { english: 'excuse', japanese: 'を許す' },
    { english: 'eye', japanese: '目、視力' },
    { english: 'face', japanese: '顔' },
    { english: 'fall', japanese: '転ぶ、転倒する' },
    { english: 'fall', japanese: '秋' },
    { english: 'fall down', japanese: '倒れる' },
    { english: 'family', japanese: '家族' },
    { english: 'famous', japanese: '有名な' },
    { english: 'farmer', japanese: '農場主' },
    { english: 'fast', japanese: '速い' },
    { english: 'father', japanese: '父' },
    { english: 'favorite', japanese: '好きな、お気に入りの' },
    { english: 'February', japanese: '2月' },
    { english: 'feel', japanese: 'と感じる' },
    { english: 'felt', japanese: '感じた' },
    { english: 'festival', japanese: '祭り' },
    { english: 'fever', japanese: '熱' },
    { english: 'fifteen', japanese: '15' },
    { english: 'fifth', japanese: '5番目' },
    { english: 'fifty', japanese: '50' },
    { english: 'fine', japanese: '元気な' },
    { english: 'first', japanese: '1番め、最初' },
    { english: 'fish', japanese: '魚' },
    { english: 'five', japanese: '5' },
    { english: 'flower', japanese: '花' },
    { english: 'food', japanese: '食べ物' },
    { english: 'for', japanese: 'として' },
    { english: 'foreign', japanese: '外国の' },
    { english: 'forget', japanese: 'を忘れる' },
    { english: 'forty', japanese: '40' },
    { english: 'forward', japanese: '前方へ' },
    { english: 'look forward to ...', japanese: 'を楽しみに待つ' },
    { english: 'four', japanese: '4' },
    { english: 'fourteen', japanese: '14' },
    { english: 'fourth', japanese: '4番目' },
    { english: 'free', japanese: 'ひまな' },
    { english: 'Friday', japanese: '金曜日' },
    { english: 'friend', japanese: '友達' },
    { english: 'frog', japanese: 'カエル' },
    { english: 'from', japanese: '【時間】から' },
    { english: 'from', japanese: '【場所】から' },
    { english: 'front', japanese: '前、正面' },
    { english: 'fruit', japanese: '果物' },
    { english: 'fun', japanese: '楽しい' },
    { english: 'funny', japanese: 'おかしな' },
    { english: 'future', japanese: '未来' },
    { english: 'garbage', japanese: 'ゴミ' },
    { english: 'gave', japanese: '与えた' },
    { english: 'get', japanese: 'を得る' },
    { english: 'get', japanese: 'になる' },
    { english: 'get', japanese: '着く、到着する' },
    { english: 'girl', japanese: '少女' },
    { english: 'give', japanese: 'を与える、渡す' },
    { english: 'go', japanese: '行く' },
    { english: 'good', japanese: '良い' },
    { english: 'good', japanese: '元気な' },
    { english: 'got', japanese: '得た' },
    { english: 'grandfather', japanese: '祖父' },
    { english: 'grandmother', japanese: '祖母' },
    { english: 'grape', japanese: 'ブドウ' },
    { english: 'great', japanese: 'すばらしい' },
    { english: 'green', japanese: '緑' },
    { english: 'guess', japanese: 'を推測する' },
    { english: 'had', japanese: '持った' },
    { english: 'hair', japanese: '髪' },
    { english: 'half', japanese: '半分、2分の1' },
    { english: 'hall', japanese: '会館、ホール' },
    { english: 'hand', japanese: '手' },
    { english: 'happy', japanese: '幸せな、うれしい、楽しい' },
    { english: 'hard', japanese: '熱心に、一生懸命に' },
    { english: 'hard', japanese: 'かたい' },
    { english: 'hat', japanese: '帽子' },
    { english: 'have', japanese: 'を持っている' },
    { english: 'have', japanese: 'を食べる、飲む' },
    { english: 'have', japanese: 'を開催する' },
    { english: 'he', japanese: '彼は' },
    { english: 'head', japanese: '頭' },
    { english: 'headache', japanese: '頭痛' },
    { english: 'heart', japanese: '心' },
    { english: 'help', japanese: 'を手伝う、助ける' },
    { english: 'here', japanese: 'ここに' },
    { english: 'hers', japanese: '彼女のもの' },
    { english: 'him', japanese: '彼を' },
    { english: 'his', japanese: '彼の' },
    { english: 'his', japanese: '彼のもの' },
    { english: 'history', japanese: '歴史' },
    { english: 'homework', japanese: '宿題' },
    { english: 'hope', japanese: 'を望む' },
    { english: 'horse', japanese: '馬' },
    { english: 'hospital', japanese: '病院' },
    { english: 'hot', japanese: '暑い' },
    { english: 'hour', japanese: '1時間' },
    { english: 'house', japanese: '家、住宅' },
    { english: 'how', japanese: 'どんな' },
    { english: 'hundred', japanese: '百' },
    { english: 'hungry', japanese: '空腹の、飢えた' },
    { english: 'I', japanese: '私は[が]' },
    { english: 'ice', japanese: '氷' },
    { english: 'idea', japanese: '考え' },
    { english: 'important', japanese: '重要な、大切な' },
    { english: 'in', japanese: '中に' },
    { english: 'information', japanese: '情報' },
    { english: 'interested in', japanese: '興味をもっている' },
    { english: 'interesting', japanese: '興味深い' },
    { english: 'is', japanese: 'です、ます' },
    { english: 'is', japanese: 'にいる、ある' },
    { english: 'island', japanese: '島' },
    { english: 'it', japanese: 'それを' },
    { english: 'it', japanese: 'それは' },
    { english: 'its', japanese: 'それの、その' },
    { english: 'January', japanese: '1月' },
    { english: 'Japan', japanese: '日本' },
    { english: 'Japanese', japanese: '日本の' },
    { english: 'Japanese', japanese: '日本語、日本人' },
    { english: 'job', japanese: '仕事' },
    { english: 'join', japanese: 'に参加する' },
    { english: 'July', japanese: '7月' },
    { english: 'jump', japanese: '跳ぶ' },
    { english: 'June', japanese: '6月' },
    { english: 'junior', japanese: '年下の' },
    { english: 'junior high school', japanese: '中学校' },
    { english: 'just', japanese: 'ちょうど、まさに' },
    { english: 'kind', japanese: '親切な' },
    { english: 'king', japanese: '王様' },
    { english: 'knee', japanese: 'ひざ' },
    { english: 'know', japanese: 'を知っている' },
    { english: 'lake', japanese: '湖' },
    { english: 'language', japanese: '言葉' },
    { english: 'large', japanese: '大きい、広い' },
    { english: 'last', japanese: 'この前の' },
    { english: 'later', japanese: '～の後で' },
    { english: 'leave', japanese: '去る' },
    { english: 'left', japanese: '左' },
    { english: 'leg', japanese: '脚' }
];

let player = {
    x: TILE_SIZE * 1.5, // パックマンの初期位置 (タイル中央)
    y: TILE_SIZE * 1.5,
    radius: TILE_SIZE / 2 - 2, // タイルサイズに合わせて調整
    mouthOpen: 0.75 * Math.PI,
    mouthDirection: 1, // 1: open, -1: close
    speed: 1, // パックマンの移動速度 (変更点: 2 -> 1)
    dx: 0,
    dy: 0,
    currentDirection: null, // 現在向いている方向 ('left', 'right', 'up', 'down')
    desiredDirection: null // 入力された次の方向
};

let ghosts = [];
const GHOST_SPEED = 0.75; // ゴーストの移動速度 (変更点: 1.5 -> 0.75)
const VULNERABLE_GHOST_SPEED = 0.35; // パワーアップ時のゴーストの速度 (変更点: 0.7 -> 0.35)

let dots = []; // 日本語の「えさ」
let currentEnglishWord = null; // 現在のターゲット英単語
let gameScore = 0;
let gameLives = 3;
let gamePlaying = false;
let wordsGuessedCorrectly = new Set(); // 正解済みの英単語を追跡
let highScore = 0; // ハイスコア

// グローバルでgameIntervalを宣言し、初期値をnullに設定
let gameInterval = null;

// パワーアップ状態とタイマー
let ghostsAreVulnerable = false;
let vulnerabilityTimerId = null;
const VULNERABILITY_DURATION_MS = 7000; // 7秒間

// ゴーストの色
const GHOST_COLORS = ['red', 'pink', 'cyan', 'orange'];
const VULNERABLE_GHOST_COLOR = 'blue'; // パワーアップ時の色
const EATEN_GHOST_COLOR = 'gray'; // 食べられたゴーストの色

// 日本語テキスト表示のための設定
const JP_FONT_SIZE = TILE_SIZE * 0.7; // タイルのサイズに合わせて調整
const JP_FONT_FAMILY = 'Arial, sans-serif';

// --- Shojiキャラクター用の設定 ---
const USE_SHOJI_IMAGE = true; // trueにするとShojiさんの画像を使用
// ★★★ここにShojiさんの写真のオンラインURLを貼り付けてください★★★
// 例: 'https://i.imgur.com/your_shoji_image.png' または 'https://shojinottenglish.github.io/my-game-assets/shoji.png'
const SHOJI_IMAGE_URL = 'https://shojinottenglish.github.io/my-game-assets/shojisensei.jpg'; // 仮のファイル名: shoji.png
let shojiImage = new Image();
shojiImage.src = SHOJI_IMAGE_URL;
shojiImage.onerror = () => {
    console.error('Shoji image failed to load. Falling back to default Pac-Man. Please check if the URL is correct and the image exists at that location.');
    // 画像の読み込みに失敗した場合、従来のパックマン描画にフォールバック
    // USE_SHOJI_IMAGEはconstなので、描画ロジックでshojiImage.completeなどを確認してフォールバックします。
};
// --- Shojiキャラクター用の設定ここまで ---


// 迷路の定義 (0: 壁, 1: 道, 2: パワーペレット)
const mazes = [
    // Maze 1 (現在のシンプルな迷路)
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0], // Player spawn (1,1)
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    // Maze 2 (少し複雑な迷路)
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0],
        [0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1,0],
        [0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    // Maze 3 (さらに複雑な迷路の例)
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0],
        [0,1,0,0,1,0,1,1,1,1,1,1,1,1,0,1,0,0,1,0],
        [0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,0,1,0,0,1,0,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]
];
let currentMazeIndex = 0;
let currentMaze = mazes[currentMazeIndex];

// Tone.jsシンセサイザーのインスタンス
let pacmanChompSynth;
let ghostEatenSynth;
let playerDeathNoise;
let roundClearSynth;
let gameOverSynth;

// Utility functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Check if a given point (x, y) with a radius is colliding with a wall
// This checks the current tile and the potential next tiles based on dx/dy
function isCollidingWithWall(x, y, dx, dy, radius) {
    // Calculate potential next position
    const nextX = x + dx;
    const nextY = y + dy;

    // Check the four corners of the bounding box of the moving entity
    const checkPoints = [
        { cx: nextX - radius + 1, cy: nextY - radius + 1 }, // Top-left
        { cx: nextX + radius - 1, cy: nextY - radius + 1 }, // Top-right
        { cx: nextX - radius + 1, cy: nextY + radius - 1 }, // Bottom-left
        { cx: nextX + radius - 1, cy: nextY + radius - 1 }  // Bottom-right
    ];

    for (const p of checkPoints) {
        // Convert pixel coordinates to grid coordinates
        const col = Math.floor(p.cx / TILE_SIZE);
        const row = Math.floor(p.cy / TILE_SIZE);

        // Check if the point is outside maze bounds or hits a wall (0)
        if (row < 0 || row >= GRID_HEIGHT || col < 0 || col >= GRID_WIDTH || currentMaze[row][col] === 0) {
            return true;
        }
    }
    return false;
}

// --- Drawing functions ---
function drawMaze() {
    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            const tileX = col * TILE_SIZE;
            const tileY = row * TILE_SIZE;
            if (currentMaze[row][col] === 0) { // 壁
                ctx.fillStyle = '#3182ce'; // 青っぽい壁
                ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
                ctx.strokeStyle = '#4299e1'; // 壁の枠
                ctx.lineWidth = 2;
                ctx.strokeRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

function drawPacman() {
    // Shojiさんの画像が有効で、かつ読み込みが完了している場合
    if (USE_SHOJI_IMAGE && shojiImage.complete && shojiImage.naturalWidth > 0) {
        // 画像をプレイヤーの位置に描画
        // player.x, player.y は円の中心なので、画像の左上隅を計算
        const imgX = player.x - player.radius;
        const imgY = player.y - player.radius;
        const imgSize = player.radius * 2; // パックマンの半径に合わせて画像サイズを調整

        ctx.drawImage(shojiImage, imgX, imgY, imgSize, imgSize);
    } else {
        // 従来のパックマンの描画ロジック
        ctx.beginPath();
        const angle = player.mouthOpen / 2;
        let startAngle, endAngle;

        // 口の向きに応じて開始・終了角度を設定
        let offsetAngle = 0;
        switch (player.currentDirection) {
            case 'right': offsetAngle = 0; break;
            case 'left': offsetAngle = Math.PI; break;
            case 'up': offsetAngle = 1.5 * Math.PI; break;
            case 'down': offsetAngle = 0.5 * Math.PI; break;
            default: offsetAngle = 0; // 停止時は右向き
        }

        ctx.arc(player.x, player.y, player.radius, offsetAngle + angle, offsetAngle + (2 * Math.PI - angle));
        ctx.lineTo(player.x, player.y); // 口の形を作るために中心に線を引く
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
    }

    // 口の開閉アニメーション (画像使用時はアニメーションさせない)
    if (!USE_SHOJI_IMAGE || !shojiImage.complete || shojiImage.naturalWidth === 0) {
        player.mouthOpen += player.mouthDirection * 0.05 * Math.PI; // アニメーション速度調整
        if (player.mouthOpen > 0.75 * Math.PI || player.mouthOpen < 0.25 * Math.PI) {
            player.mouthDirection *= -1;
        }
    }
}

function drawGhosts() {
    ghosts.forEach(ghost => {
        ctx.beginPath();
        // 頭 (半円)
        ctx.arc(ghost.x, ghost.y - ghost.radius / 2, ghost.radius, Math.PI, 0, false);
        // 体 (長方形)
        ctx.rect(ghost.x - ghost.radius, ghost.y - ghost.radius / 2, ghost.radius * 2, ghost.radius * 1.5);
        // 足 (ギザギザ)
        ctx.lineTo(ghost.x + ghost.radius, ghost.y + ghost.radius);
        ctx.lineTo(ghost.x + ghost.radius * 0.75, ghost.y + ghost.radius * 0.5);
        ctx.lineTo(ghost.x + ghost.radius * 0.5, ghost.y + ghost.radius);
        ctx.lineTo(ghost.x + ghost.radius * 0.25, ghost.y + ghost.radius * 0.5);
        ctx.lineTo(ghost.x, ghost.y + ghost.radius);
        ctx.lineTo(ghost.x - ghost.radius * 0.25, ghost.y + ghost.radius * 0.5);
        ctx.lineTo(ghost.x - ghost.radius * 0.5, ghost.y + ghost.radius);
        ctx.lineTo(ghost.x - ghost.radius * 0.75, ghost.y + ghost.radius * 0.5);
        ctx.lineTo(ghost.x - ghost.radius, ghost.y + ghost.radius);

        // ゴーストの色を状態に応じて変更
        ctx.fillStyle = ghost.isEaten ? EATEN_GHOST_COLOR : (ghost.isVulnerable ? VULNERABLE_GHOST_COLOR : ghost.color);
        ctx.fill();
        ctx.closePath();

        // 目
        ctx.beginPath();
        ctx.arc(ghost.x - ghost.radius * 0.4, ghost.y - ghost.radius * 0.2, ghost.radius * 0.2, 0, Math.PI * 2); // 左目
        ctx.arc(ghost.x + ghost.radius * 0.4, ghost.y - ghost.radius * 0.2, ghost.radius * 0.2, 0, Math.PI * 2); // 右目
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(ghost.x - ghost.radius * 0.4, ghost.y - ghost.radius * 0.2, ghost.radius * 0.1, 0, Math.PI * 2); // 左瞳
        ctx.arc(ghost.x + ghost.radius * 0.4, ghost.y - ghost.radius * 0.2, ghost.radius * 0.1, 0, Math.PI * 2); // 右瞳
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    });
}

function drawDots() {
    dots.forEach(dot => {
        if (dot.visible) {
            if (dot.type === 'power_pellet') {
                // パワーペレットの描画 (大きな点)
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, TILE_SIZE / 4, 0, Math.PI * 2); // 通常のドットより大きく
                ctx.fillStyle = 'white';
                ctx.fill();
                ctx.closePath();
            } else {
                // 日本語訳の描画
                ctx.font = `${JP_FONT_SIZE}px "${JP_FONT_FAMILY}"`;
                ctx.fillStyle = '#FFFFFF'; // 白文字
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(dot.japanese, dot.x, dot.y);
            }
        }
    });
}

function updateDisplays() {
    scoreDisplay.textContent = `スコア: ${gameScore}`;
    livesDisplay.textContent = `ライフ: ${gameLives}`;
    highScoreDisplay.textContent = `ハイスコア: ${highScore}`;
    if (currentEnglishWord) {
        targetWordDisplay.textContent = `ターゲット英単語: 「${currentEnglishWord.english}」`;
    } else {
        targetWordDisplay.textContent = `ターゲット英単語: -`;
    }
}

// --- Sound Functions (Tone.js) ---
function initSounds() {
    // Only initialize if Tone is available and not already initialized
    if (typeof Tone !== 'undefined' && !pacmanChompSynth) {
        Tone.start().then(() => {
            console.log("Audio context started!");
            // パックマンがドットを食べた音
            pacmanChompSynth = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: "square" }
            }).toDestination();
            
            // ゴーストが食べられた音
            ghostEatenSynth = new Tone.MembraneSynth({
                pitchDecay: 0.05,
                octaves: 8,
                envelope: {
                    attack: 0.001,
                    decay: 0.4,
                    sustain: 0.01,
                    release: 0.8,
                    attackCurve: "exponential"
                }
            }).toDestination();

            // プレイヤーが死んだ（ライフ減少）音
            playerDeathNoise = new Tone.NoiseSynth({
                noise: { type: "white" },
                envelope: { attack: 0.005, decay: 0.1, sustain: 0.05, release: 0.5 }
            }).toDestination();
            
            // ラウンドクリア音
            roundClearSynth = new Tone.PolySynth(Tone.Synth).toDestination();

            // ゲームオーバー音
            gameOverSynth = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: "sawtooth" }
            }).toDestination();

        }).catch(e => console.error("Error starting Tone.js audio context:", e));
    }
}

function playChompSound() {
    if (pacmanChompSynth) pacmanChompSynth.triggerAttackRelease(["C4", "E4"], "16n");
}
function playGhostEatenSound() {
    if (ghostEatenSynth) ghostEatenSynth.triggerAttackRelease("C3", "8n");
}
function playPlayerDeathSound() {
    if (playerDeathNoise) playerDeathNoise.triggerAttackRelease("4n");
}
function playRoundClearSound() {
    if (roundClearSynth) roundClearSynth.triggerAttackRelease(["C5", "E5", "G5"], "4n");
}
function playGameOverSound() {
    if (gameOverSynth) gameOverSynth.triggerAttackRelease(["C2", "G2", "C3"], "2n");
}


// --- Game Logic ---
function movePlayer() {
    let newDx = player.dx;
    let newDy = player.dy;

    if (player.desiredDirection) {
        let proposedDx = 0;
        let proposedDy = 0;
        
        switch (player.desiredDirection) {
            case 'left': proposedDx = -player.speed; break;
            case 'right': proposedDx = player.speed; break;
            case 'up': proposedDy = -player.speed; break;
            case 'down': proposedDy = player.speed; break;
        }

        const currentTileCol = Math.floor(player.x / TILE_SIZE);
        const currentTileRow = Math.floor(player.y / TILE_SIZE);
        const tileCenterX = currentTileCol * TILE_SIZE + TILE_SIZE / 2;
        const tileCenterY = currentTileRow * TILE_SIZE + TILE_SIZE / 2;
        const alignmentTolerance = player.speed / 2;

        let canSwitchDirection = false;

        if (player.currentDirection === null || player.desiredDirection === player.currentDirection) {
            if (!isCollidingWithWall(player.x, player.y, proposedDx, proposedDy, player.radius)) {
                canSwitchDirection = true;
            }
        } 
        else if ((player.currentDirection === 'up' || player.currentDirection === 'down') &&
                   (player.desiredDirection === 'left' || player.desiredDirection === 'right')) {
            if (Math.abs(player.y - tileCenterY) <= alignmentTolerance) {
                if (!isCollidingWithWall(player.x, tileCenterY, proposedDx, proposedDy, player.radius)) {
                    player.y = tileCenterY; // Snap Y to center
                    canSwitchDirection = true;
                }
            }
        } 
        else if ((player.currentDirection === 'left' || player.currentDirection === 'right') &&
                   (player.desiredDirection === 'up' || player.desiredDirection === 'down')) {
            if (Math.abs(player.x - tileCenterX) <= alignmentTolerance) {
                if (!isCollidingWithWall(tileCenterX, player.y, proposedDx, proposedDy, player.radius)) {
                    player.x = tileCenterX; // Snap X to center
                    canSwitchDirection = true;
                }
            }
        }

        if (canSwitchDirection) {
            newDx = proposedDx;
            newDy = proposedDy;
            player.currentDirection = player.desiredDirection;
            player.desiredDirection = null; // Consume the desired direction
        } else {
            if (isCollidingWithWall(player.x, player.y, newDx, newDy, player.radius)) {
                newDx = 0;
                newDy = 0;
                player.currentDirection = null; // Stop if blocked
            }
        }
    } else {
        if (isCollidingWithWall(player.x, player.y, newDx, newDy, player.radius)) {
            newDx = 0;
            newDy = 0;
            player.currentDirection = null; // Stop if blocked
        }
    }

    player.x += newDx;
    player.y += newDy;

    player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));

    player.dx = newDx;
    player.dy = newDy;
}


function moveGhosts() {
    ghosts.forEach((ghost, index) => {
        if (ghost.isEaten) {
            // 食べられたゴーストは初期位置に戻る
            const initialPos = ghost.initialPosition;
            const dist = Math.hypot(ghost.x - initialPos.x, ghost.y - initialPos.y);
            if (dist < GHOST_SPEED * 2) { // 戻る速度に応じて調整
                ghost.x = initialPos.x;
                ghost.y = initialPos.y;
                ghost.isEaten = false; // 戻ったら食べられた状態を解除
                ghost.isVulnerable = false; // 食べられたゴーストは脆弱状態も解除
                ghost.dx = GHOST_SPEED; // 初期方向に戻す
                ghost.dy = 0;
                ghost.lastDir = 'right';
                return; // このゴーストの処理を終了
            } else {
                // 初期位置へ向かう
                const angle = Math.atan2(initialPos.y - ghost.y, initialPos.x - ghost.x);
                ghost.dx = Math.cos(angle) * GHOST_SPEED * 2; // 早く戻る
                ghost.dy = Math.sin(angle) * GHOST_SPEED * 2;
                ghost.x += ghost.dx;
                ghost.y += ghost.dy;
                return; // このゴーストの処理を終了
            }
        }

        let currentTileCol = Math.floor(ghost.x / TILE_SIZE);
        let currentTileRow = Math.floor(ghost.y / TILE_SIZE);

        const tileCenterX = currentTileCol * TILE_SIZE + TILE_SIZE / 2;
        const tileCenterY = currentTileRow * TILE_SIZE + TILE_SIZE / 2;
        const alignmentTolerance = (ghost.isVulnerable ? VULNERABLE_GHOST_SPEED : GHOST_SPEED) / 2;

        // ゴーストがグリッドの中心にいる場合、新しい方向を選択
        if (Math.abs(ghost.x - tileCenterX) < alignmentTolerance &&
            Math.abs(ghost.y - tileCenterY) < alignmentTolerance) {
            
            ghost.x = tileCenterX; // Snap to center
            ghost.y = tileCenterY; // Snap to center

            const directions = [
                { dx: 0, dy: -1, dir: 'up' },
                { dx: 0, dy: 1, dir: 'down' },
                { dx: -1, dy: 0, dir: 'left' },
                { dx: 1, dy: 0, dir: 'right' }
            ];
            let possibleMoves = [];

            // 赤いゴースト (index 0) はパックマンを追跡
            if (index === 0 && !ghost.isVulnerable) {
                let bestMove = null;
                let minDist = Infinity;
                directions.forEach(move => {
                    const nextCol = currentTileCol + move.dx;
                    const nextRow = currentTileRow + move.dy;
                    if (nextRow >= 0 && nextRow < GRID_HEIGHT && nextCol >= 0 && nextCol < GRID_WIDTH && currentMaze[nextRow][nextCol] === 1) {
                        const isOpposite = (move.dir === 'up' && ghost.lastDir === 'down') ||
                                           (move.dir === 'down' && ghost.lastDir === 'up') ||
                                           (move.dir === 'left' && ghost.lastDir === 'right') ||
                                           (move.dir === 'right' && ghost.lastDir === 'left');
                        if (!isOpposite) {
                            const dist = Math.hypot((nextCol * TILE_SIZE + TILE_SIZE/2) - player.x, (nextRow * TILE_SIZE + TILE_SIZE/2) - player.y);
                            if (dist < minDist) {
                                minDist = dist;
                                bestMove = move;
                            }
                        }
                    }
                });
                if (bestMove) {
                    possibleMoves.push(bestMove);
                } else { // 追跡できない場合はランダム移動の候補も考慮
                     directions.forEach(move => {
                        const nextCol = currentTileCol + move.dx;
                        const nextRow = currentTileRow + move.dy; // 修正済
                        if (nextRow >= 0 && nextRow < GRID_HEIGHT && nextCol >= 0 && nextCol < GRID_WIDTH && currentMaze[nextRow][nextCol] === 1) {
                            const isOpposite = (move.dir === 'up' && ghost.lastDir === 'down') ||
                                               (move.dir === 'down' && ghost.lastDir === 'up') ||
                                               (move.dir === 'left' && ghost.lastDir === 'right') ||
                                               (move.dir === 'right' && ghost.lastDir === 'left');
                            if (!isOpposite) {
                                possibleMoves.push(move);
                            }
                        }
                    });
                }
            } else if (ghost.isVulnerable) { // 脆弱状態のゴーストはパックマンから逃げる
                let worstMove = null;
                let maxDist = -Infinity;
                directions.forEach(move => {
                    const nextCol = currentTileCol + move.dx;
                    const nextRow = currentTileRow + move.dy; // 修正済
                    if (nextRow >= 0 && nextRow < GRID_HEIGHT && nextCol >= 0 && nextCol < GRID_WIDTH && currentMaze[nextRow][nextCol] === 1) {
                        const isOpposite = (move.dir === 'up' && ghost.lastDir === 'down') ||
                                           (move.dir === 'down' && ghost.lastDir === 'up') ||
                                           (move.dir === 'left' && ghost.lastDir === 'right') ||
                                           (move.dir === 'right' && ghost.lastDir === 'left');
                        if (!isOpposite) {
                            const dist = Math.hypot((nextCol * TILE_SIZE + TILE_SIZE/2) - player.x, (nextRow * TILE_SIZE + TILE_SIZE/2) - player.y);
                            if (dist > maxDist) {
                                maxDist = dist;
                                worstMove = move;
                            }
                        }
                    }
                });
                if (worstMove) {
                    possibleMoves.push(worstMove);
                } else { // 逃げられない場合はランダム移動の候補も考慮
                     directions.forEach(move => {
                        const nextCol = currentTileCol + move.dx;
                        const nextRow = currentTileRow + move.dy; // 修正済
                        if (nextRow >= 0 && nextRow < GRID_HEIGHT && nextCol >= 0 && nextCol < GRID_WIDTH && currentMaze[nextRow][nextCol] === 1) {
                            const isOpposite = (move.dir === 'up' && ghost.lastDir === 'down') ||
                                               (move.dir === 'down' && ghost.lastDir === 'up') ||
                                               (move.dir === 'left' && ghost.lastDir === 'right') ||
                                               (move.dir === 'right' && ghost.lastDir === 'left');
                            if (!isOpposite) {
                                possibleMoves.push(move);
                            }
                        }
                    });
                }

            } else { // その他のゴーストはランダム移動
                directions.forEach(move => {
                    const nextCol = currentTileCol + move.dx;
                    const nextRow = currentTileRow + move.dy; // 修正済
                    // 壁がなく、現在の逆方向でなければ候補に追加
                    if (nextRow >= 0 && nextRow < GRID_HEIGHT && nextCol >= 0 && nextCol < GRID_WIDTH && currentMaze[nextRow][nextCol] === 1) {
                        const isOpposite = (move.dir === 'up' && ghost.lastDir === 'down') ||
                                           (move.dir === 'down' && ghost.lastDir === 'up') ||
                                           (move.dir === 'left' && ghost.lastDir === 'right') ||
                                           (move.dir === 'right' && ghost.lastDir === 'left');
                        if (!isOpposite) {
                            possibleMoves.push(move);
                        }
                    }
                });
            }

            // 可能な移動方向がなければ、現在の方向を維持するか、逆方向に進む
            if (possibleMoves.length === 0) {
                // If there are no valid non-reverse moves, try reversing
                let reverseMove = null;
                if (ghost.lastDir === 'up') reverseMove = { dx: 0, dy: 1, dir: 'down' };
                else if (ghost.lastDir === 'down') reverseMove = { dx: 0, dy: -1, dir: 'up' };
                else if (ghost.lastDir === 'left') reverseMove = { dx: 1, dy: 0, dir: 'right' };
                else if (ghost.lastDir === 'right') reverseMove = { dx: -1, dy: 0, dir: 'left' };

                if (reverseMove && currentMaze[currentTileRow + reverseMove.dy] && currentMaze[currentTileRow + reverseMove.dy][currentTileCol + reverseMove.dx] === 1) {
                    possibleMoves.push(reverseMove); // Only add if it's a valid path
                }
            }


            if (possibleMoves.length > 0) {
                const chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                ghost.dx = chosenMove.dx * (ghost.isVulnerable ? VULNERABLE_GHOST_SPEED : GHOST_SPEED);
                ghost.dy = chosenMove.dy * (ghost.isVulnerable ? VULNERABLE_GHOST_SPEED : GHOST_SPEED);
                ghost.lastDir = chosenMove.dir;
            } else {
                // Stuck, stop
                ghost.dx = 0;
                ghost.dy = 0;
            }
        }
        
        // Apply determined movement
        let nextGhostX = ghost.x + ghost.dx;
        let nextGhostY = ghost.y + ghost.dy;

        let blockedGhostX = false;
        let blockedGhostY = false;

        if (ghost.dx !== 0 && isCollidingWithWall(ghost.x, ghost.y, ghost.dx, 0, ghost.radius)) {
            blockedGhostX = true;
            ghost.dx *= -1; // 反転
        }
        if (ghost.dy !== 0 && isCollidingWithWall(ghost.x, ghost.y, 0, ghost.dy, ghost.radius)) {
            blockedGhostY = true;
            ghost.dy *= -1; // 反転
        }

        if (!blockedGhostX) {
            ghost.x += ghost.dx;
        }
        if (!blockedGhostY) {
            ghost.y += ghost.dy;
        }
        
        ghost.x = Math.max(ghost.radius, Math.min(canvas.width - ghost.radius, ghost.x));
        ghost.y = Math.max(ghost.radius, Math.min(canvas.height - ghost.radius, ghost.y));
    });
}


function checkDotCollision() {
    dots.forEach(dot => {
        if (dot.visible && Math.hypot(player.x - dot.x, player.y - dot.y) < player.radius + dot.radius * 0.5) {
            dot.visible = false;
            if (dot.type === 'power_pellet') {
                playChompSound(); // パワーペレット音
                activatePowerUp();
                gameScore += 10; // パワーペレットのボーナススコア
                messageDisplay.textContent = `パワーアップ！ゴーストを食べるチャンス！`;
            } else if (dot.isCorrect) {
                playRoundClearSound(); // 正解音
                gameScore += 50;
                messageDisplay.textContent = `正解！「${currentEnglishWord.english}」の意味を見つけました！`;
                wordsGuessedCorrectly.add(currentEnglishWord.english);
                startNextRound();
            } else {
                playChompSound(); // 通常のドット音（不正解でも）
                gameScore = Math.max(0, gameScore - 10);
                messageDisplay.textContent = `不正解… スコアが10点減りました。正しい意味を探して！`;
            }
            updateDisplays();
        }
    });
}

function checkGhostCollision() {
    ghosts.forEach(ghost => {
        if (!ghost.isEaten && Math.hypot(player.x - ghost.x, player.y - ghost.y) < player.radius + ghost.radius) {
            if (ghostsAreVulnerable && ghost.isVulnerable) {
                // ゴーストが脆弱状態のときにパックマンが触れたら食べる
                playGhostEatenSound(); // ゴーストを食べた音
                gameScore += 100; // ゴーストを食べたボーナス
                ghost.isEaten = true;
                ghost.isVulnerable = false; // 食べられたゴーストは脆弱状態を解除
                messageDisplay.textContent = `ゴーストを食べた！ボーナス100点！`;
                // ゴーストは自動的に初期位置に戻る（moveGhostsで処理）
            } else {
                // 通常のゴーストに触れたらライフ減少
                playPlayerDeathSound(); // プレイヤーが死んだ音
                gameLives--;
                updateDisplays();
                if (gameLives <= 0) {
                    endGame(`ゲームオーバー！最終スコア: ${gameScore}`);
                } else {
                    messageDisplay.textContent = `ゴーストに捕まった！ライフが減りました。残りライフ: ${gameLives}。スペースキーで再開。`;
                    resetRound();
                }
            }
        }
    });
}

function activatePowerUp() {
    ghostsAreVulnerable = true;
    ghosts.forEach(ghost => {
        if (!ghost.isEaten) { // 既に食べられていないゴーストのみ
            ghost.isVulnerable = true;
        }
    });

    // 既存のタイマーがあればクリア
    if (vulnerabilityTimerId) {
        clearTimeout(vulnerabilityTimerId);
    }

    // 一定時間後に脆弱状態を解除
    vulnerabilityTimerId = setTimeout(() => {
        ghostsAreVulnerable = false;
        ghosts.forEach(ghost => {
            ghost.isVulnerable = false;
        });
        messageDisplay.textContent = `パワーアップ終了！ゴーストに注意！`;
    }, VULNERABILITY_DURATION_MS);
}


// --- Game Setup ---
function resetPlayerAndGhosts() {
    // パックマンを初期位置に戻す (タイル中央)
    player.x = TILE_SIZE * 1.5;
    player.y = TILE_SIZE * 1.5;
    player.dx = 0;
    player.dy = 0;
    player.currentDirection = null;
    player.desiredDirection = null;

    // ゴーストを初期位置にリセット
    ghosts = [];
    // ゴーストの初期位置を、通路であり、かつパックマンの初期位置と被らないように設定
    const ghostStartPositions = [
        { row: 1, col: 18 }, // 右上
        { row: 18, col: 1 }, // 左下
        { row: 18, col: 18 }, // 右下
        { row: 10, col: 10 } // 中央付近
    ];

    shuffleArray(ghostStartPositions); // ゴーストの開始位置をシャッフル

    for (let i = 0; i < 4; i++) {
        const pos = ghostStartPositions[i];
        const ghostX = pos.col * TILE_SIZE + TILE_SIZE / 2;
        const ghostY = pos.row * TILE_SIZE + TILE_SIZE / 2;
        ghosts.push({
            x: ghostX,
            y: ghostY,
            initialPosition: { x: ghostX, y: ghostY }, // 初期位置を保存
            radius: TILE_SIZE / 2 - 2,
            color: GHOST_COLORS[i % GHOST_COLORS.length],
            dx: GHOST_SPEED, // 初期は右に動かす
            dy: 0,
            lastDir: 'right', // 最後に移動した方向
            isVulnerable: false, // 脆弱状態かどうか
            isEaten: false // 食べられた状態かどうか
        });
    }

    // パワーアップ状態をリセット
    ghostsAreVulnerable = false;
    if (vulnerabilityTimerId) {
        clearTimeout(vulnerabilityTimerId);
        vulnerabilityTimerId = null;
    }
}

function placeDotsForRound() {
    dots = [];
    const availableCells = [];
    for (let r = 0; r < GRID_HEIGHT; r++) {
        for (let c = 0; c < GRID_WIDTH; c++) {
            // 壁ではない場所、かつプレイヤーやゴーストの初期位置ではない場所
            // Pac-Man: (1,1), Ghosts: (1,18), (18,1), (18,18), (10,10) (0-indexed)
            const isPlayerStart = (r === 1 && c === 1);
            const isGhostStart = ghosts.some(g => {
                const gRow = Math.floor(g.initialPosition.y / TILE_SIZE); // 初期位置で判定
                const gCol = Math.floor(g.initialPosition.x / TILE_SIZE); // 初期位置で判定
                return gRow === r && gCol === c;
            });

            if (currentMaze[r][c] === 1 && !isPlayerStart && !isGhostStart) {
                availableCells.push({ row: r, col: c });
            }
        }
    }
    shuffleArray(availableCells);

    let roundWords = [];
    // まだ正解されていない単語の中からターゲットを選ぶ
    const availableWordsForTarget = wordList.filter(
        (word) => !wordsGuessedCorrectly.has(word.english)
    );

    if (availableWordsForTarget.length === 0) {
        endGame(`ゲームクリア！全ての単語をマスターしました！最終スコア: ${gameScore}`);
        return;
    }

    // ターゲット単語を選択
    const randomIndex = Math.floor(Math.random() * availableWordsForTarget.length);
    currentEnglishWord = availableWordsForTarget[randomIndex];
    
    roundWords.push({
        word: currentEnglishWord.japanese,
        isCorrect: true,
        type: 'word'
    });

    // ダミーの日本語訳を選ぶ
    const distractors = [];
    const tempWordList = wordList.filter(
        (word) => word.japanese !== currentEnglishWord.japanese && !wordsGuessedCorrectly.has(word.english)
    );
    shuffleArray(tempWordList);

    let uniqueDistractorsCount = 0;
    for (let i = 0; i < tempWordList.length && uniqueDistractorsCount < 3; i++) {
        const distractor = tempWordList[i];
        if (!roundWords.some(rw => rw.word === distractor.japanese)) {
            distractors.push({
                word: distractor.japanese,
                isCorrect: false,
                type: 'word'
            });
            uniqueDistractorsCount++;
        }
    }

    let wordsToPlace = shuffleArray(roundWords.concat(distractors)).slice(0, 4);

    while (wordsToPlace.length < 4) {
        const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        if (!wordsToPlace.some(w => w.word === randomWord.japanese)) {
             wordsToPlace.push({ word: randomWord.japanese, isCorrect: false, type: 'word' });
        } else {
            wordsToPlace.push({ word: randomWord.japanese, isCorrect: false, type: 'word' });
        }
    }
    wordsToPlace = wordsToPlace.slice(0, 4);


    // 選択された日本語訳を迷路に配置
    wordsToPlace.forEach((wordObj, index) => {
        if (availableCells[index]) {
            const cell = availableCells[index];
            dots.push({
                x: cell.col * TILE_SIZE + TILE_SIZE / 2,
                y: cell.row * TILE_SIZE + TILE_SIZE / 2,
                japanese: wordObj.word,
                isCorrect: wordObj.isCorrect,
                visible: true,
                radius: TILE_SIZE / 2 * 0.8,
                type: 'word'
            });
        }
    });

    // パワーペレットを配置 (ランダムな空きセルに1つ)
    const powerPelletPlacementAttempts = 5; // 配置試行回数
    let powerPelletPlaced = false;
    for (let i = 0; i < powerPelletPlacementAttempts && !powerPelletPlaced; i++) {
        const randomCellIndex = Math.floor(Math.random() * availableCells.length);
        const cell = availableCells[randomCellIndex];
        // 既にドットが配置されていないか確認
        const isCellOccupied = dots.some(dot => dot.x === (cell.col * TILE_SIZE + TILE_SIZE / 2) && dot.y === (cell.row * TILE_SIZE + TILE_SIZE / 2));
        if (cell && !isCellOccupied) {
            dots.push({
                x: cell.col * TILE_SIZE + TILE_SIZE / 2,
                y: cell.row * TILE_SIZE + TILE_SIZE / 2,
                visible: true,
                radius: TILE_SIZE / 2 * 0.5, // 小さめの半径
                type: 'power_pellet'
            });
            powerPelletPlaced = true;
        }
    }

    updateDisplays();
}

function initGame() {
    gameScore = 0;
    gameLives = 3;
    gamePlaying = false;
    wordsGuessedCorrectly.clear(); // 正解済み単語をリセット
    gameInterval = null; // ゲーム開始時にintervalをリセット
    highScore = parseInt(localStorage.getItem('pacmanHighScore') || '0', 10); // ハイスコアをロード

    // 最初の迷路を設定
    currentMazeIndex = 0; // またはランダムな開始迷路
    currentMaze = mazes[currentMazeIndex];

    resetPlayerAndGhosts(); // パックマンとゴーストを初期位置に
    placeDotsForRound(); // 最初の日本語訳とターゲット英単語を設定

    messageDisplay.textContent = 'ゲームを開始するには「スタート」ボタンを押してください。';
    startButton.style.display = 'block';
    startButton.onclick = startGame;
    updateDisplays();
    drawGame(); // 初期描画
    initSounds(); // サウンドの初期化

    // ゲーム初期化後も口のアニメーションのためにループを開始しておく
    if (!gameInterval) {
        gameInterval = requestAnimationFrame(gameLoop);
    }
}

function startGame() {
    gamePlaying = true;
    startButton.style.display = 'none';
    messageDisplay.textContent = '「' + currentEnglishWord.english + '」の意味を探そう！';
    if (gameInterval) {
        cancelAnimationFrame(gameInterval);
    }
    gameInterval = requestAnimationFrame(gameLoop);
}

function resetRound() {
    resetPlayerAndGhosts();
    gamePlaying = false; // パックマンの動きを停止し、スペースキーで再開できるようにする
    messageDisplay.textContent = `ゴーストに捕まった！ライフが減りました。残りライフ: ${gameLives}。スペースキーで再開。`;
    updateDisplays();
    drawGame(); // リセット後の描画
    if (gameInterval) {
        cancelAnimationFrame(gameInterval);
        gameInterval = null;
    }
    gameInterval = requestAnimationFrame(gameLoop); // アニメーションのためにループを継続
}

function startNextRound() {
    if (wordsGuessedCorrectly.size === wordList.length) {
        endGame(`ゲームクリア！全ての単語をマスターしました！最終スコア: ${gameScore}`);
        return;
    }
    
    // 次の迷路に切り替え
    currentMazeIndex = (currentMazeIndex + 1) % mazes.length;
    currentMaze = mazes[currentMazeIndex];

    resetPlayerAndGhosts(); // 次のラウンドでパックマンとゴーストをリセット
    placeDotsForRound(); // 新しい単語セットとターゲットを設定
    gamePlaying = false; // パックマンの動きを停止し、スペースキーで再開できるようにする
    messageDisplay.textContent = `次の単語！「${currentEnglishWord.english}」の意味を探そう！スペースキーで開始。`;
    updateDisplays();
    if (gameInterval) {
        cancelAnimationFrame(gameInterval);
        gameInterval = null;
    }
    gameInterval = requestAnimationFrame(gameLoop); // アニメーションのためにループを継続
}

function endGame(message) {
    playGameOverSound(); // ゲームオーバー音
    cancelAnimationFrame(gameInterval);
    gameInterval = null; // ゲームループを完全に停止
    gamePlaying = false;
    
    // ハイスコアの更新
    if (gameScore > highScore) {
        highScore = gameScore;
        localStorage.setItem('pacmanHighScore', highScore.toString());
        message = `NEWハイスコア達成！${highScore}点！` + message;
    }

    messageDisplay.textContent = message + ' スタートボタンを押して、もう一度プレイ！';
    startButton.style.display = 'block';
    updateDisplays(); // ハイスコアを更新して表示
}

// --- Game Loop ---
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawDots();
    drawPacman(); // drawPacmanが画像か円かを判断
    drawGhosts();
}

function gameLoop() {
    if (!gamePlaying) {
        // ゲームが一時停止中の場合でも、パックマンの口アニメーションと描画は行う
        drawGame();
        gameInterval = requestAnimationFrame(gameLoop); // ループを継続
        return; // ゲームロジックの更新はスキップ
    }

    movePlayer();
    moveGhosts();
    checkDotCollision();
    checkGhostCollision();

    drawGame(); // 全てを描画

    gameInterval = requestAnimationFrame(gameLoop);
}

// --- Event Listeners ---
document.addEventListener('keydown', e => {
    // ゲームが一時停止中で、スペースキーが押された場合
    if (!gamePlaying && e.key === ' ') {
        if (gameLives > 0) {
            startGame(); // ゲームを再開
        } else {
            // ゲームオーバー時は何もしないか、スタートボタンを押すよう促す
            messageDisplay.textContent = 'ゲームオーバーです！スタートボタンを押して、もう一度プレイしてください。';
        }
    } else if (gamePlaying) { // ゲームプレイ中の移動入力
        switch (e.key) {
            case 'ArrowLeft': player.desiredDirection = 'left'; break;
            case 'ArrowRight': player.desiredDirection = 'right'; break;
            case 'ArrowUp': player.desiredDirection = 'up'; break;
            case 'ArrowDown': player.desiredDirection = 'down'; break;
        }
    }
});

document.addEventListener('keyup', e => {
    // Pac-Manは通常、キーを離してもすぐに止まらず、壁にぶつかるか方向転換するまで進み続ける
    // そのため、ここではplayer.dx/dyを0にする処理は行わない
});

// Initialize game on window load
window.onload = initGame;
