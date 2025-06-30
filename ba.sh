#!/bin/bash

for i in {1..3320..4}
do
	echo "run $i"
	
	num1=$i
	num2=$((i+1))
	num3=$((i+2))
	num4=$((i+3))
	
	convert +append ../../../../bad-apple-vid-480-15fps/bad-apple-$num1.png ../../../../bad-apple-vid-480-15fps/bad-apple-$num2.png bad-apple-temp1-$num4.png
	convert +append ../../../../bad-apple-vid-480-15fps/bad-apple-$num3.png ../../../../bad-apple-vid-480-15fps/bad-apple-$num4.png bad-apple-temp2-$num4.png
	
	convert -append bad-apple-temp1-$num4.png bad-apple-temp2-$num4.png bad-apple-hv-$num4.png
	convert bad-apple-hv-$num4.png -fill yellow -draw 'color 0,0 point' bad-apple-hv-$num4.png
	
	rm bad-apple-temp1-$num4.png bad-apple-temp2-$num4.png
done
