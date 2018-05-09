#!/bin/sh
target="q42.js"

echo "(function(window,document){" > $target.full

for file in logo beziers svg canvas2d webgl
do
	cat ./src/$file.js >> $target.full
done

# Auto-include all modules
for file in ./src/modules/*.js
do
	cat $file >> $target.full
done

cat ./src/embeds.js >> $target.full


echo "})(window,document);" >> $target.full

echo -n Creating $target..
java -jar ./lib/compiler.jar --language_in ECMASCRIPT5 --compilation_level ADVANCED_OPTIMIZATIONS --js $target.full --js_output_file $target

gzip -kfv $target

rm $target.full

echo done!
