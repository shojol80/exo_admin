import Str from "laravel-js-str";

export default function pathToId(path) {
    return Str.of(path).ltrim('/').after('resources/views/').before('.blade.php').replace('/', '.').toString();
}
