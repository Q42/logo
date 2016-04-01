#!/bin/sh
target="q42.js"

echo "(function(window,document){" > $target.full

for file in logo embeds svg canvas2d webgl
do
	cat ./src/$file.js >> $target.full
done

# Specific non-default modules, pass their basenames as arguments
for file in $@
do
	cat ./src/modules/$file.js >> $target.full
done


echo "})(window,document);" >> $target.full

echo -n Creating $target..
java -jar ./lib/compiler.jar --language_in ECMASCRIPT5 --compilation_level ADVANCED_OPTIMIZATIONS --js $target.full --js_output_file $target

rm $target.full

echo done!
