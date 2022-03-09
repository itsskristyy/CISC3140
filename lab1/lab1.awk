BEGIN{
FS = ","
}


{
print "Ranking"  OFS $0 ;

}

{


first = 3;
last = 6;
for(i = first; i <last; i++){
	printf("%s ", $i) }

print $last

}

