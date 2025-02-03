def main(config="config.yaml", intemp="template.html", outtemp="outtemp.html"):
    print("LOG: in main()")

    with open(intemp, "r") as fin:
        inlist = fin.readlines()
        with open(config, "r") as fconf:
            configd = dict()
            for cline in fconf.readlines():
                clinel = cline.split(":")
                configd[clinel[0]] = str(clinel[1]).rstrip()
            print(f"LOG: {configd}")
            for idx in range(len(inlist)):
                for key,val in configd.items():
                    #print(f"LOG: line:{line},key:{key},val:{val}")
                    inlist[idx] = inlist[idx].replace("{{"+key+"}}", val)
                #print(inlist[idx], end="")
            outlist = []
            for idx in range(len(inlist)):
                outlist.append(inlist[idx])
    with open(outtemp, "w") as fout:
        fout.writelines(outlist)



if __name__ == "__main__":
    ## TEST 1
    #main(intemp="miniin.html", outtemp="miniout.html")
    # REAL TEST 1
    main()

